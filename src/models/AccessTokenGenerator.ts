import type { AccessToken } from "./AccessToken.ts";

/**
 * Callback function that generates an access token.
 * @remarks Passed to `createContext`.
 * @module AccessTokenGenerator
 * @category Models
 */
export type AccessTokenGenerator = () => Promise<AccessToken>;
