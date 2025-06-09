/**
 * Callback function that generates an access token.
 * @remarks Passed to `createContext`.
 * @module AccessTokenGenerator
 * @category Models
 */

import type { AccessToken } from "./AccessToken.ts";

export type AccessTokenGenerator = () => Promise<AccessToken>;
