/**
 * Context of requests.
 * @module Context
 * @category Models
 */

import type { AccessTokenGenerator } from "./AccessTokenGenerator.ts";

/**
 * Context actual
 */
export type Context = {
	/**
	 * Method to generate an access token to use to authenticate the request.
	 */
	generateAccessToken: AccessTokenGenerator;
};

/**
 * Reference to a context
 */
export type ContextRef = {
	context: Context;
};
