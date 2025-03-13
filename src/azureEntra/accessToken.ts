import { ClientSecretCredential, type AccessToken as InnerAccessToken } from "@azure/identity";
import { azureClientId, azureClientSecret, azureTenantId } from "./configuration.js";

export type AccessToken = string & { __brand: "AccessToken" };
export type Scope = string & { __brand: "Scope" };

const credential = new ClientSecretCredential(azureTenantId, azureClientId, azureClientSecret);
const innerTokenCache: Record<Scope, InnerAccessToken> = {};

/** Get an access token for a given scope. If an unexpired one is cached it will be returned, otherwise requests a new one. */
export async function getCurrentAccessToken(scope: Scope): Promise<AccessToken> {
	let innerToken = innerTokenCache[scope];

	if (!innerToken || innerToken.expiresOnTimestamp < Date.now()) {
		innerTokenCache[scope] = innerToken = await credential.getToken(scope);
	}

	return innerToken.token as AccessToken;
}