import { getCurrentAccessToken, type Scope } from "../azureEntra/accessToken.js";
import InvalidArgumentError from "./errors/InvalidArgumentError.js";
import RequestFailedError from "./errors/RequestFailedError.js";
import type { GraphHeaders, GraphRequest } from "./GraphRequest.js";

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

type Results<T> = {
    [K in keyof T]: T[K] extends GraphRequest<infer R> ? R : never;
};

/** Execute GraphAPI batch with up to 20 concurrent requests. */
export default async function execute<T extends GraphRequest<unknown>[]>(...calls: T): Promise<Results<T>> {
    const accessToken = await getCurrentAccessToken(authenticationScope);

    if (calls.length < minBatchCalls || calls.length > maxBatchCalls)
        throw new InvalidArgumentError(`Requires at least ${minBatchCalls} and at most ${maxBatchCalls} calls`);

    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            'authorization': `Bearer ${accessToken}`,
            'accept': 'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            requests: calls.map((call, index) => ({
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

    const results: Partial<Results<T>> = {};

    json.responses.forEach((response: Response) => {
        if (response.status !== 200) {
            const body = response.body as ResponseErrorBody;
            throw new RequestFailedError(`[REQUEST INDEX: ${response.id} STATUS: ${response.status} CODE: ${body.code}]: ${body.message}`);
        }

        const index = parseInt(response.id, 10);
        results[index] = response.body;
    });

    return results as Results<T>;
}
