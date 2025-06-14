/**
 * Azure application credential helpers for authentication and token management.
 * @module azureApplicationCredentials
 * @category Services
 */

import { ClientSecretCredential, type AccessToken as InnerAccessToken } from "@azure/identity";
import type { AccessToken } from "../models/AccessToken.ts";
import type { AzureClientId, AzureClientSecret, AzureTenantId, Scope } from "../models/AzureApplicationCredentials.ts";

const innerTokenCache: Record<CacheKey, InnerAccessToken> = {};

/**
 * Retrieves the current access token for a given client and scope.
 * If a valid token is cached, it will be returned; otherwise, a new token will be requested.
 * @param tenantId - The tenant ID.
 * @param clientId - The client ID.
 * @param clientSecret - The client secret.
 * @param scope - The scope for which the token is requested.
 * @returns A promise that resolves to the access token.
 */
export async function getCurrentAccessToken(tenantId: AzureTenantId, clientId: AzureClientId, clientSecret: AzureClientSecret, scope: Scope): Promise<AccessToken> {
	const cacheKey = createCacheKey(tenantId, clientId, scope);
	let innerToken = innerTokenCache[cacheKey];

	if (!innerToken || innerToken.expiresOnTimestamp < Date.now()) {
		const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);

		innerTokenCache[cacheKey] = innerToken = await credential.getToken(scope);
	}

	return innerToken.token as AccessToken;
}

type CacheKey = string & {
	__brand: "CacheKey";
};

function createCacheKey(tenantId: AzureTenantId, clientId: AzureClientId, scope: Scope): CacheKey {
	return `${tenantId}/${clientId}/${scope}` as CacheKey;
}
