import InvalidArgumentError from "./errors/InvalidArgumentError.js";
import RequestFailedError from "./errors/RequestFailedError.js";
import type { GraphOperation } from "./models/GraphOperation.js";
import type { Scope } from "./models/Scope.js";
import { getCurrentAccessToken } from "./services/accessToken.js";
import { isHttpOk } from "./services/httpStatus.js";

const authenticationScope = "https://graph.microsoft.com/.default" as Scope;
const endpoint = "https://graph.microsoft.com/v1.0/$batch";
const minBatchCalls = 1;
const maxBatchCalls = 20; // https://learn.microsoft.com/en-us/graph/json-batching?tabs=http#batch-size-limitations

type ReplyPayload = {
    responses: {
        id: string;
        status: number;
        headers: Record<string, string>;
        body: unknown;
    }[];
}

type ExecutionResults<T> = {
    [K in keyof T]: T[K] extends GraphOperation<infer R> ? R : never;
};

/** Execute GraphAPI batch with up to 20 requests to be executed as a batch. */
export async function execute<T extends GraphOperation<unknown>[]>(...ops: T): Promise<ExecutionResults<T>> {
    if (ops.length < minBatchCalls || ops.length > maxBatchCalls) {
        throw new InvalidArgumentError(`Requires at least ${minBatchCalls} and at most ${maxBatchCalls} calls`);
    }

    const requestPayload = await composeRequestPayload<T>(ops);

    const response = await fetch(endpoint, requestPayload);

    if (!isHttpOk(response.status)) {
        const responsePayload = await response.json();

        throw new RequestFailedError(
            `GraphAPI batch failed with HTTP ${response.status}\n` +
            `Operations: ${JSON.stringify(ops, null, 2)}\n` +
            `Response: ${JSON.stringify(responsePayload, null, 2)}`
        );
    }

    const replyPayload = await response.json() as ReplyPayload;

    return parseResponses<T>(replyPayload, ops);
}

async function composeRequestPayload<T extends GraphOperation<unknown>[]>(ops: T) {
    const accessToken = await getCurrentAccessToken(authenticationScope);

    const requestBody = {
        requests: ops.map((call, index) => ({
            id: index.toString(),
            method: call.method,
            url: call.path,
            headers: call.headers,
            body: call.body === null ? undefined : call.body,
            dependsOn: call.dependsOn?.map((id) => id.toString())
        }))
    };

    const requestPayload = {
        method: "POST",
        headers: {
            'authorization': `Bearer ${accessToken}`,
            'accept': 'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    };

    return requestPayload;
}

function parseResponses<T extends GraphOperation<unknown>[]>(replyPayload: ReplyPayload, ops: T) {
    if (!replyPayload.responses) {
        throw new RequestFailedError("Batch request did not return any responses");
    }

    const results: unknown[] = []; // A little ugly, but effective without blatantly compromising type safety. Is there a neater way?

    for (const response of replyPayload.responses) {
        const index = Number.parseInt(response.id, 10);

        const headers: Record<string, string> = {};
        for (const key in response.headers) {
            headers[key.toLocaleLowerCase()] = response.headers[key] ?? "";
        }

        const contentType = headers["content-type"];

        let body = response.body;

        // Batch API sometimes returns base64 encoded JSON, correct for that
        if (contentType?.startsWith("application/json") && typeof response.body === "string") {
            body = JSON.parse(atob(response.body));
        }

        if (!isHttpOk(response.status)) {
            const op = JSON.stringify(ops[index], null, 2);
            const bodyRaw = JSON.stringify(body, null, 2);

            throw new RequestFailedError(
                `GraphAPI batch operation ${index} failed with HTTP ${response.status}\n` +
                `Operation: ${op}\n` +
                `Error body: ${bodyRaw}}`
            );
        }

        results[index] = body;
    }

    return results as ExecutionResults<T>;
}
