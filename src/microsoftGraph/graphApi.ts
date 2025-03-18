import InvalidArgumentError from "./errors/InvalidArgumentError.js";
import RequestFailedError from "./errors/RequestFailedError.js";
import type { GraphOperation } from "./models/GraphOperation.js";
import type { Scope } from "./models/Scope.js";
import { getCurrentAccessToken } from "./services/accessToken.js";
import { jsonContentType } from "./services/contentTypes.js";
import { operationIdToIndex, operationIndexToId } from "./services/operationId.js";

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
    InvalidArgumentError.throwIfOutside(ops.length, minBatchCalls, maxBatchCalls, "Requires at least 1 and at most 20 calls");

    const requestPayload = await composeRequestPayload<T>(ops);
    const reply = await fetch(endpoint, requestPayload);
    const replyPayload = await reply.json() as ReplyPayload;
    RequestFailedError.throwIfNotOkBatch(reply.status, ops, replyPayload);
    const responses = parseResponses<T>(replyPayload, ops);

    return responses;
}

async function composeRequestPayload<T extends GraphOperation<unknown>[]>(ops: T) {
    const accessToken = await getCurrentAccessToken(authenticationScope);

    const requestBody = {
        requests: ops.map((op, index) => ({
            id: operationIndexToId(index),
            method: op.method,
            url: op.path,
            headers: op.headers,
            body: op.body === null ? undefined : op.body,
            dependsOn: op.dependsOn?.map((id) => id.toString())
        }))
    };

    const requestPayload = {
        method: "POST",
        headers: {
            "authorization": `Bearer ${accessToken}`,
            "accept": jsonContentType,
            "content-type": jsonContentType
        },
        body: JSON.stringify(requestBody)
    };

    return requestPayload;
}

function normaliseBody(contentType: string | undefined, body: unknown) {
    if (contentType?.startsWith("application/json") && typeof body === "string") {
        return JSON.parse(atob(body));
    }

    return body;
}

function normaliseHeaders(input: Record<string, string>): Record<string, string> {
    const headers: Record<string, string> = {};
    for (const key in input) {
        if (input[key]) {
            headers[key.toLocaleLowerCase()] = input[key];
        }
    }
    return headers;
}

function parseResponses<T extends GraphOperation<unknown>[]>(replyPayload: ReplyPayload, ops: T) {
    const results: unknown[] = [];

    for (const response of replyPayload.responses) {
        const index = operationIdToIndex(response.id);
        const headers = normaliseHeaders(response.headers);
        const contentType = headers["content-type"];
        const body = normaliseBody(contentType, response.body);

        RequestFailedError.throwIfNotOkOperation(response.status, index, ops[index], body);

        results[index] = body;
    }

    return results as ExecutionResults<T>; // A little ugly, but effective without blatantly compromising type safety. Is there a neater way?
}
