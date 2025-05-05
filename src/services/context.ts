import ContextNotRegisteredError from "../errors/ContextNotRegisteredError.ts";
import type { ClientId } from "../models/ClientId.ts";
import type { ClientSecret } from "../models/ClientSecret.ts";
import type { Context } from "../models/Context.ts";
import type { ContextId } from "../models/ContextId.ts";
import type { ContextRef } from "../models/ContextRef.ts";
import type { TenantId } from "../models/TenantId.ts";
import { getEnvironmentVariable } from "./environmentVariable.ts";
import { generateRandomString } from "./random.ts";

const contexts: Record<ContextId, Context> = {};

/**
 * Registers a tenant+client so that its secret can be used later.
 * @param tenantId - The tenant ID.
 * @param clientId - The client ID.
 * @param clientSecret - The client secret.
 * @returns A reference to the registered context.
 */
export function register(tenantId: TenantId, clientId: ClientId, clientSecret: ClientSecret): ContextRef {
	const contextId = generateContextId();

	const context: Context = {
		tenantId,
		clientId,
		clientSecret,
	};

	contexts[contextId] = context;

	const contextRef = createContextRef(contextId);

	return contextRef;
}

/**
 * Retrieves the context for a given context ID.
 * @param contextId - The ID of the context.
 * @returns The context associated with the given ID.
 * @throws ContextNotRegisteredError if the context ID is not registered.
 */
export function getContext(contextId: ContextId): Context {
	const context = contexts[contextId];
	if (!context) {
		throw new ContextNotRegisteredError(`Context with ID ${contextId} is not registered`);
	}
	return context;
}

function generateContextId(): ContextId {
	return generateRandomString(16) as ContextId;
}

function createContextRef(contextId: ContextId): ContextRef {
	return {
		contextId,
	};
}

/**
 * Retrieves the opinionated default context reference. NOT RECOMMENDED FOR PRODUCTION USE.
 * @returns A reference to the default context.
 * @remarks This method is opinionated and not recommended for production use.
 */
export function getDefaultContextRef(): ContextRef {
	const tenantId = getEnvironmentVariable("AZURE_TENANT_ID") as TenantId;
	const clientId = getEnvironmentVariable("AZURE_CLIENT_ID") as ClientId;
	const clientSecret = getEnvironmentVariable("AZURE_CLIENT_SECRET") as ClientSecret;

	const contextRef = register(tenantId, clientId, clientSecret);

	return contextRef;
}
