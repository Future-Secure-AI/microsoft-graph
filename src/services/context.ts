import ContextNotRegisteredError from "../errors/ContextNotRegisteredError.ts";
import type { ClientId } from "../models/ClientId.ts";
import type { ClientSecret } from "../models/ClientSecret.ts";
import type { Context } from "../models/Context.ts";
import type { ContextId } from "../models/ContextId.ts";
import type { ContextRef } from "../models/ContextRef.ts";
import type { HttpProxy } from "../models/HttpProxy.ts";
import type { TenantId } from "../models/TenantId.ts";
import { getEnvironmentVariable } from "./environmentVariable.ts";
import { generateRandomString } from "./random.ts";

const contexts: Record<ContextId, Context> = {};

/** Register a tenant/client so that it's secret can be used latter. */
export function register(tenantId: TenantId, clientId: ClientId, clientSecret: ClientSecret, httpProxy?: HttpProxy | undefined): ContextRef {
    const contextId = generateContextId();

    const context: Context = {
        tenantId,
        clientId,
        clientSecret,
        httpProxy
    };

    contexts[contextId] = context;

    const contextRef = createContextRef(contextId);

    return contextRef;
}

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
        contextId
    };
}


/** Opinionated method of getting default context reference. Not recommended for production use. */
export function getDefaultContextRef(): ContextRef {
    const tenantId = getEnvironmentVariable("AZURE_TENANT_ID") as TenantId;
    const clientId = getEnvironmentVariable("AZURE_CLIENT_ID") as ClientId;
    const clientSecret = getEnvironmentVariable("AZURE_CLIENT_SECRET") as ClientSecret;
    const httpProxy = (getEnvironmentVariable("HTTP_PROXY", "") || undefined) as HttpProxy | undefined;

    const contextRef = register(tenantId, clientId, clientSecret, httpProxy);

    return contextRef;
}