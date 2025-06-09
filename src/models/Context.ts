/**
 * Context of requests.
 * @module Context
 * @category Models
 */

import type { AccessTokenGenerator } from "./AccessTokenGenerator.ts";

export type Context = {
	/**
	 * Method to generate an access token to use to authenticate the request.
	 */
	generateAccessToken: AccessTokenGenerator;
};
