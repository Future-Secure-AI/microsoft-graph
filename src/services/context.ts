import type { AccessToken } from "../models/AccessToken.ts";
import type { AccessTokenGenerator } from "../models/AccessTokenGenerator.ts";
import type { ClientId } from "../models/ClientId.ts";
import type { ClientSecret } from "../models/ClientSecret.ts";
import type { ContextRef } from "../models/ContextRef.ts";
import type { Scope } from "../models/Scope.ts";
import type { TenantId } from "../models/TenantId.ts";
import { getCurrentAccessToken } from "./accessToken.ts";
import { getEnvironmentVariable } from "./environmentVariable.ts";

const defaultScope = "https://graph.microsoft.com/.default" as Scope;

/** Create a context using the client secret credential. */
export function createClientSecretContext(tenantId: TenantId, clientId: ClientId, clientSecret: ClientSecret, scope: Scope = defaultScope): ContextRef {
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
	// biome-ignore lint/suspicious/useAwait: Not applicable here, as we are creating a context that returns a static access token.
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
	const tenantId = getEnvironmentVariable("AZURE_TENANT_ID") as TenantId;
	const clientId = getEnvironmentVariable("AZURE_CLIENT_ID") as ClientId;
	const clientSecret = getEnvironmentVariable("AZURE_CLIENT_SECRET") as ClientSecret;

	return createClientSecretContext(tenantId, clientId, clientSecret);
}

/**
 @obsolete Use `createDefaultClientSecretContext()` instead.
 */
export function getDefaultContextRef(): ContextRef {
	return createDefaultClientSecretContext();
}

/**
 * @obsolete Use `createClientSecretContext()` instead.
 */
export function register(tenantId: TenantId, clientId: ClientId, clientSecret: ClientSecret): ContextRef {
	return createClientSecretContext(tenantId, clientId, clientSecret);
}
