import InvalidArgumentError from "./errors/InvalidArgumentError.js";
import RequestFailedError from "./errors/RequestFailedError.js";
import type { GraphHeaders, GraphOperation } from "./models/GraphOperation.js";
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
        headers: GraphHeaders;
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

    const response = await fetch(batchEndpoint, {
        method: "POST",
        headers: {
            'authorization': `Bearer ${accessToken}`,
            'accept': 'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            requests: ops.map((call, index) => ({
                id: index.toString(),
                method: call.method,
                url: call.path,
                headers: call.headers,
                body: call.body,
                dependsOn: call.dependsOn?.map((id) => id.toString())
            }))
        })
    });

    if (!response.ok) {
        throw new RequestFailedError(`Batch request failed with status ${response.status}`);
    }

    const json = await response.json() as Response;

    if (!json.responses) {
        throw new RequestFailedError("Batch request did not return any responses");
    }

    const results: Partial<ExecutionResults<T>> = {};

    for (const response of json.responses) {
        const opIndex = Number.parseInt(response.id, 10);

        if (response.status !== 200) {
            const op = JSON.stringify(ops[opIndex], null, 2);
            const bodyRaw = JSON.stringify(response.body, null, 2);

            throw new RequestFailedError(
                `GraphAPI execution failed with HTTP ${response.status}\n` +
                `Operation (index ${opIndex}): ${op}\n` +
                `Error body: ${bodyRaw}}`
            );
        }

        results[opIndex] = response.body;
    }

    return results as ExecutionResults<T>;
}
