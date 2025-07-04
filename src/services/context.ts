/**
 * Context creation and management utilities for Microsoft Graph API authentication.
 * @module context
 * @category Services
 */

import type { AccessToken } from "../models/AccessToken.ts";
import type { AccessTokenGenerator } from "../models/AccessTokenGenerator.ts";
import type { AzureClientId, AzureClientSecret, AzureTenantId, Scope } from "../models/AzureApplicationCredentials.ts";
import type { ContextRef } from "../models/Context.ts";
import { getCurrentAccessToken } from "./azureApplicationCredentials.ts";
import { getEnvironmentVariable } from "./environmentVariable.ts";
("../models/Scope.ts");

const defaultScope = "https://graph.microsoft.com/.default" as Scope;

/** Create a context using the client secret credential. */
export function createClientSecretContext(tenantId: AzureTenantId, clientId: AzureClientId, clientSecret: AzureClientSecret, scope: Scope = defaultScope): ContextRef {
	const generateAccessToken: AccessTokenGenerator = async () => {
		return await getCurrentAccessToken(tenantId, clientId, clientSecret, scope);
	};

	return createContext(generateAccessToken);
}

/**
 * Create a context using a static access token.
 * @remarks You must manually handle renewal of the access token with this approach.
 */
export function createAccessTokenContext(accessToken: AccessToken): ContextRef {
	return createContext(async () => {
		return accessToken;
	});
}

/** Create a context using a given access token generator. */
export function createContext(accessTokenGenerator: AccessTokenGenerator): ContextRef {
	const context = {
		generateAccessToken: accessTokenGenerator,
	};

	return {
		context,
	};
}

/** Create a context using the client secret credential using environment variables AZURE_TENANT_ID, AZURE_CLIENT_ID and AZURE_CLIENT_SECRET. */
export function createDefaultClientSecretContext(): ContextRef {
	const tenantId = getEnvironmentVariable("AZURE_TENANT_ID") as AzureTenantId;
	const clientId = getEnvironmentVariable("AZURE_CLIENT_ID") as AzureClientId;
	const clientSecret = getEnvironmentVariable("AZURE_CLIENT_SECRET") as AzureClientSecret;

	return createClientSecretContext(tenantId, clientId, clientSecret);
}

/**
 @deprecated Use `createDefaultClientSecretContext()` instead.
 */
export function getDefaultContextRef(): ContextRef {
	return createDefaultClientSecretContext();
}

/**
 * @deprecated Use `createClientSecretContext()` instead.
 */
export function register(tenantId: AzureTenantId, clientId: AzureClientId, clientSecret: AzureClientSecret): ContextRef {
	return createClientSecretContext(tenantId, clientId, clientSecret);
}
