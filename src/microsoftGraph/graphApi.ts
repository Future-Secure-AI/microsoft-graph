import InvalidArgumentError from "./errors/InvalidArgumentError.js";
import RequestFailedError from "./errors/RequestFailedError.js";
import type { GraphOperation } from "./models/GraphOperation.js";
import type { Scope } from "./models/Scope.js";
import { getCurrentAccessToken } from "./services/accessToken.js";

const authenticationScope = "https://graph.microsoft.com/.default" as Scope;
const batchEndpoint = "https://graph.microsoft.com/v1.0/$batch";
const minBatchCalls = 1;
const maxBatchCalls = 20; // https://learn.microsoft.com/en-us/graph/json-batching?tabs=http#batch-size-limitations

type Response = {
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
    const accessToken = await getCurrentAccessToken(authenticationScope);

    if (ops.length < minBatchCalls || ops.length > maxBatchCalls) {
        throw new InvalidArgumentError(`Requires at least ${minBatchCalls} and at most ${maxBatchCalls} calls`);
    }

    const requestBody = {
        requests: ops.map((call, index) => ({
            id: index.toString(),
            method: call.method,
            url: call.path,
            headers: call.headers,
            body: call.body == null ? undefined : call.body,
            dependsOn: call.dependsOn?.map((id) => id.toString())
        }))
    };

    const response = await fetch(batchEndpoint, {
        method: "POST",
        headers: {
            'authorization': `Bearer ${accessToken}`,
            'accept': 'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
        const responseBody = await response.json();

        throw new RequestFailedError(
            `GraphAPI batch failed with HTTP ${response.status}\n` +
            `Batch: ${JSON.stringify(requestBody, null, 2)}\n` +
            `Body: ${JSON.stringify(responseBody, null, 2)}`
        );
    }

    const json = await response.json() as Response;

    if (!json.responses) {
        throw new RequestFailedError("Batch request did not return any responses");
    }

    const results: unknown[] = []; // A little ugly, but effective without blatantly compromising type safety. Is there a neater way?

    for (const response of json.responses) {
        const index = Number.parseInt(response.id, 10);

        const headers: Record<string, string> = {};
        for (const key in response.headers) {
            headers[key.toLocaleLowerCase()] = response.headers[key] ?? "";
        }

        const contentType = headers["content-type"];

        let body = response.body;

        if (contentType?.startsWith("application/json") && typeof response.body === "string") { // Batch API sometimes returns base64 encoded JSON
            body = JSON.parse(atob(response.body));
        }

        //   "Content-Type": "application/json;odata.metadata=minimal;odata.streaming=true;IEEE754Compatible=false;charset=utf-8"
        if (response.status < 200 || response.status > 299) {
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
