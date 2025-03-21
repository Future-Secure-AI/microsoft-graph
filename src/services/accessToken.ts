import { ClientSecretCredential, type AccessToken as InnerAccessToken } from "@azure/identity";
import type { AccessToken } from "../models/AccessToken.ts";
import type { Scope } from "../models/Scope.ts";
import { azureClientIdEnv, azureClientSecretEnv, azureTenantIdEnv } from "./configuration.ts";

const innerTokenCache: Record<Scope, InnerAccessToken> = {};

/** Get an access token for a given scope. If an unexpired one is cached it will be returned, otherwise requests a new one. */
export async function getCurrentAccessToken(scope: Scope): Promise<AccessToken> {
	let innerToken = innerTokenCache[scope];

	if (!innerToken || innerToken.expiresOnTimestamp < Date.now()) {
		const azureTenantId = azureTenantIdEnv();
		const azureClientId = azureClientIdEnv();
		const azureClientSecret = azureClientSecretEnv();

		const credential = new ClientSecretCredential(azureTenantId, azureClientId, azureClientSecret);

		innerTokenCache[scope] = innerToken = await credential.getToken(scope);
	}

	return innerToken.token as AccessToken;
}