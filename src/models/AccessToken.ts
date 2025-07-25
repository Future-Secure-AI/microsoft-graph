/**
 * Token sent to server to authenticate a request.
 * @remarks May be automatically generated by graphApi (for instance, when `createClientSecretContext` or `createContext` is used with a `accessTokenGenerator`) or may be static (ie when `createAccessTokenContext` is used).
 * @module AccessToken
 * @category Models
 */
export type AccessToken = string & {
	readonly __brand: unique symbol;
};
