import { ClientSecretCredential, type AccessToken as InnerAccessToken } from "@azure/identity";
import type { AccessToken } from "../models/AccessToken.ts";
import type { ClientId } from "../models/ClientId.ts";
import type { ClientSecret } from "../models/ClientSecret.ts";
import type { Scope } from "../models/Scope.ts";
import type { TenantId } from "../models/TenantId.ts";

const innerTokenCache: Record<CacheKey, InnerAccessToken> = {};

/** Get an access token for a given client and scope. If an unexpired one is cached it will be returned, otherwise requests a new one. */
export async function getCurrentAccessToken(tenantId: TenantId, clientId: ClientId, clientSecret: ClientSecret, scope: Scope): Promise<AccessToken> {
	const cacheKey = createCacheKey(tenantId, clientId, scope);
	let innerToken = innerTokenCache[cacheKey];

	if (!innerToken || innerToken.expiresOnTimestamp < Date.now()) {
		const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);

		innerTokenCache[cacheKey] = innerToken = await credential.getToken(scope);
	}

	return innerToken.token as AccessToken
}

type CacheKey = string & {
	__brand: "CacheKey";
};

function createCacheKey(tenantId: TenantId, clientId: ClientId, scope: Scope): CacheKey {
	return `${tenantId}/${clientId}/${scope}` as CacheKey;
}