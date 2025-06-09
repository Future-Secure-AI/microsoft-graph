/**
 * An atomic operation to be performed against the Microsoft Graph API.
 * @module GraphOperation
 * @category Models
 */

import type { Context } from "./Context.ts";
import type { HttpHeaders, HttpMethod, HttpPath } from "./Http.ts";

/**
 * Definition of an operation to be performed against the Microsoft Graph API.
 * @template T The type of the response from the operation.
 */
export type GraphOperationDefinition<T> = {
	/** Context to match the operation to. Used for authentication etc. */
	context: Context;
	/** HTTP method to be used. */
	method: HttpMethod;
	/** Relative resource URL for the individual request. Ie, if the absolute URL is `https://graph.microsoft.com/v1.0/users`, this path is `/users`. */
	path: HttpPath;
	/** HTTP headers to be used. When the body is supplied, a Content-Type header must be included. */
	headers: HttpHeaders;
	/** JSON object or a base64 URL-encoded value, for example, when the body is an image. When a body is included with the request, the headers object must contain a value for Content-Type. */
	body: unknown;
	/** Translate the server response into a usable model */
	responseTransform: (response: unknown) => T;
};

/**
 * Instance of an operation to be performed against the Microsoft Graph API.
 * @template T The type of the response from the operation.
 */
export type GraphOperation<T> = Promise<T> & {
	definition: GraphOperationDefinition<T>;
};

/**
 * Response from a batch of Graph operations.
 * @template T The type of the operations in the batch.
 */
export type OperationResponse<T> = {
	[K in keyof T]: T[K] extends GraphOperation<infer R> ? R : never;
};
