/**
 * Azure application credential helpers for authentication and token management.
 * @module azureApplicationCredentials
 * @category Services
 * @hidden
 */

import { ClientSecretCredential, type AccessToken as InnerAccessToken } from "@azure/identity";
import type { AccessToken } from "../models/AccessToken.ts";
import type { AzureClientId, AzureClientSecret, AzureTenantId, Scope } from "../models/AzureApplicationCredentials.ts";

const innerTokenCache: Record<CacheKey, InnerAccessToken> = {};

/**
 * @deprecated
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
	readonly __brand: unique symbol;
};

function createCacheKey(tenantId: AzureTenantId, clientId: AzureClientId, scope: Scope): CacheKey {
	return `${tenantId}/${clientId}/${scope}` as CacheKey;
}
