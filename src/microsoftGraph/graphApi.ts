
import InvalidArgumentError from "./errors/InvalidArgumentError.js";
import RequestFailedError from "./errors/RequestFailedError.js";
import type { GraphOperation, GraphOperationDefinition } from "./models/GraphOperation.js";
import type { Scope } from "./models/Scope.js";
import { getCurrentAccessToken } from "./services/accessToken.js";
import { operationIdToIndex, operationIndexToId } from "./services/operationId.js";

const authenticationScope = "https://graph.microsoft.com/.default" as Scope;
const endpoint = "https://graph.microsoft.com/v1.0/$batch";
const maxBatchOperations = 20; // https://learn.microsoft.com/en-us/graph/json-batching?tabs=http#batch-size-limitations

type ReplyPayload = {
    responses: {
        id: string;
        status: number;
        headers: Record<string, string>;
        body: unknown;
    }[];
}

type Op<T> = GraphOperationDefinition<T> & {
    /** Array of request indexes that must be completed before this request is executed. */
    dependsOn?: number[] | undefined;
};

type ExecutionResults<T> = {
    [K in keyof T]: T[K] extends GraphOperationDefinition<infer R> ? R : never;
};


export function operation<T>(definition: GraphOperationDefinition<T>): GraphOperation<T> {
    const a = single(definition) as GraphOperation<T>;

    a.definition = definition;

    return a;
}

async function single<T>(op: GraphOperationDefinition<T>): Promise<T> { // TODO: Refactor away?
    return (await execute(op))[0] as T; // TODO: Use non-batching endpoint? Gives better concurency??
}

/** Execute a batch of GraphAPI operations in parallel. Provides the best performance for batch operations, however only useful if operations can logically be performed at the same time. */
export async function parallel<T extends GraphOperationDefinition<unknown>[]>(...ops: T): Promise<ExecutionResults<T>> {
    return await execute(...ops);
}

/** Execute a batch of GraphAPI operations sequentially. */
export async function sequential<T extends GraphOperationDefinition<unknown>[]>(...ops: T): Promise<ExecutionResults<T>> {
    const opsSequential = ops.map((op, index) => ({
        ...op,
        dependsOn: index > 0 ? [index - 1] : undefined // Each op is dependant on the previous op
    }) as Op<T>) as T;

    return await execute(...opsSequential);
}

async function execute<T extends Op<unknown>[]>(...ops: T): Promise<ExecutionResults<T>> {
    InvalidArgumentError.throwIfGreater(ops.length, maxBatchOperations, `At most ${maxBatchOperations} operations allowed, but ${ops.length} were provided.`);

    if (ops.length === 0) {
        return [] as ExecutionResults<T>;
    }

    const requestPayload = await composeRequestPayload<T>(ops);
    const reply = await fetch(endpoint, requestPayload);
    const replyPayload = await reply.json() as ReplyPayload;
    RequestFailedError.throwIfNotOkBatch(reply.status, ops, replyPayload);
    const responses = parseResponses<T>(replyPayload, ops);

    return responses;
}

async function composeRequestPayload<T extends Op<unknown>[]>(ops: T) {
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
            "accept": "application/json",
            "content-type": "application/json"
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

function parseResponses<T extends Op<unknown>[]>(replyPayload: ReplyPayload, ops: T) {
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
