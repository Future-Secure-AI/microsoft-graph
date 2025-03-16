import { getCurrentAccessToken, type Scope } from "../azureEntra/accessToken.js";
import BadTemplateError from "./errors/BadTemplateError.js";
import InvalidArgumentError from "./errors/InvalidArgumentError.js";
import RequestFailedError from "./errors/RequestFailedError.js";
import { kebabToCamelCase } from "./stringCaseConversion.js";
import type { WorkbookSessionId } from "./workbooks/WorkbookSessionId.js";

const authenticationScope = "https://graph.microsoft.com/.default" as Scope;
const endpoint = "https://graph.microsoft.com/v1.0/$batch";
const minBatchCalls = 1;
const maxBatchCalls = 20;// https://learn.microsoft.com/en-us/graph/json-batching?tabs=http#batch-size-limitations

export type GraphMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type GraphPath = string & { __brand: "Path" };
export type GraphHeaders = {
    "workbook-session-id"?: WorkbookSessionId | undefined,
    "content-type"?: "application/json" | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" | undefined
};

// @ts-ignore: Type used to match response
// biome-ignore lint/correctness/noUnusedVariables: Type used to match response
export type GraphRequest<T> = {
    /** HTTP method to be used. */
    method: GraphMethod;
    /** Relative resource URL for the individual request. Ie, if the absolute URL is `https://graph.microsoft.com/v1.0/users`, this path is `/users`. */
    path: GraphPath;
    /** HTTP headers to be used. When the body is supplied, a Content-Type header must be included. */
    headers: GraphHeaders,
    /** JSON object or a base64 URL-encoded value, for example, when the body is an image. When a body is included with the request, the headers object must contain a value for Content-Type. */
    body: unknown,
    /** Array of request IDs that must be completed before this request is executed */
    dependsOn?: number[]
};

export type GraphResponse = {
    id: string;
    status: number;
    headers: GraphHeaders;
    body: unknown;
};

export type ErrorBody = {
    code: string;
    message: string;
};

export type Results<T> = {
    [K in keyof T]: T[K] extends GraphRequest<infer R> ? R : never;
};

export function generatePath(template: string, args: Record<string, string>): GraphPath {
    if (!template.startsWith("/")) throw new BadTemplateError("Path template must start with a slash.");
    if (template.includes("\n")) throw new BadTemplateError("Path template must not contain newlines.");

    return template.replace(/{(\w+)}/g, (key: string): string => {
        const camelCaseKey = kebabToCamelCase(key.slice(1, -1)); // Remove curly braces before converting to camel case
        const value = args[camelCaseKey as keyof typeof args];
        if (value === undefined) throw new BadTemplateError(`Path template references argument '${camelCaseKey}' however no such argument provided.`);
        return encodeURIComponent(value);
    }) as GraphPath;
}

export async function execute<T extends GraphRequest<unknown>[]>(...calls: T): Promise<Results<T>> {
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

    json.responses.forEach((response: GraphResponse) => {
        if (response.status !== 200) {
            const body = response.body as ErrorBody;
            throw new RequestFailedError(`[REQUEST INDEX: ${response.id} STATUS: ${response.status} CODE: ${body.code}]: ${body.message}`);
        }

        const index = parseInt(response.id, 10);
        results[index] = response.body;
    });

    return results as Results<T>;
}
