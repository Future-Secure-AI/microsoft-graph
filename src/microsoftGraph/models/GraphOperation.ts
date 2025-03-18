import type { WorkbookSessionId } from "./WorkbookSessionId.js";

export type GraphMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type GraphPath = string & { __brand: "Path"; };
export type GraphHeaders = {
    "workbook-session-id"?: WorkbookSessionId | undefined;
    "content-type"?: "application/json" | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" | undefined;
};

// @ts-ignore: Type used to match response
// biome-ignore lint/correctness/noUnusedVariables: Type used to match response
export type GraphOperation<T> = {
    /** HTTP method to be used. */
    method: GraphMethod;
    /** Relative resource URL for the individual request. Ie, if the absolute URL is `https://graph.microsoft.com/v1.0/users`, this path is `/users`. */
    path: GraphPath;
    /** HTTP headers to be used. When the body is supplied, a Content-Type header must be included. */
    headers: GraphHeaders;
    /** JSON object or a base64 URL-encoded value, for example, when the body is an image. When a body is included with the request, the headers object must contain a value for Content-Type. */
    body: unknown;
};
