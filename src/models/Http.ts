/**
 * HTTP models for handling HTTP requests and responses.
 * @module Http
 * @category Models
 */

import type { WorkbookSessionId } from "./WorkbookSession.ts";

/**
 * HTTP headers used in requests and responses.
 */
export type HttpHeaders = {
	"workbook-session-id"?: WorkbookSessionId | undefined;
	"content-type"?: string | undefined;
};

/** HTTP methods used in requests. */
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/** HTTP path used in requests */
export type HttpPath = string & {
	readonly __brand: unique symbol;
};

/** HTTP proxy used to route requests */
export type HttpProxy = string & {
	readonly __brand: unique symbol;
};
