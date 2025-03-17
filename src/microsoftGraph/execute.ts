import InvalidArgumentError from "./errors/InvalidArgumentError.js";
import RequestFailedError from "./errors/RequestFailedError.js";
import type { GraphHeaders, GraphOperation } from "./models/GraphOperation.js";
import type { Scope } from "./models/Scope.js";
import { getCurrentAccessToken } from "./services/accessToken.js";

const authenticationScope = "https://graph.microsoft.com/.default" as Scope;
const endpoint = "https://graph.microsoft.com/v1.0/$batch";
const minBatchCalls = 1;
const maxBatchCalls = 20;// https://learn.microsoft.com/en-us/graph/json-batching?tabs=http#batch-size-limitations

type Response = {
    id: string;
    status: number;
    headers: GraphHeaders;
    body: unknown;
};

type ResponseErrorBody = {
    code: string;
    message: string;
};

type ExecutionResults<T> = {
    [K in keyof T]: T[K] extends GraphOperation<infer R> ? R : never;
};

/** Execute GraphAPI batch with up to 20 requests to be executed as a batch. */
export default async function execute<T extends GraphOperation<unknown>[]>(...ops: T): Promise<ExecutionResults<T>> {
    const accessToken = await getCurrentAccessToken(authenticationScope);

    if (ops.length < minBatchCalls || ops.length > maxBatchCalls)
        throw new InvalidArgumentError(`Requires at least ${minBatchCalls} and at most ${maxBatchCalls} calls`);

    const response = await fetch(endpoint, {
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

    if (!response.ok)
        throw new RequestFailedError(`Batch request failed with status ${response.status}`);

    const json = await response.json();

    if (!json.responses)
        throw new RequestFailedError("Batch request did not return any responses");

    const results: Partial<ExecutionResults<T>> = {};

    json.responses.forEach((response: Response) => {
        if (response.status !== 200) {
            const body = response.body as ResponseErrorBody;
            throw new RequestFailedError(`[REQUEST INDEX: ${response.id} STATUS: ${response.status} CODE: ${body.code}]: ${body.message}`);
        }

        const index = parseInt(response.id, 10);
        results[index] = response.body;
    });

    return results as ExecutionResults<T>;
}
