import EnvironmentVariableMissingError from "../errors/EnvironmentVariableMissingError.ts";

function get(env: string, fallbackValue: string | null = null): string {
	const value = process.env[env]?.trim() ?? "";

	if (value === "") {
		if (fallbackValue === null) {
			throw new EnvironmentVariableMissingError(env);
		}
		return fallbackValue ?? "";
	}

	return value;
}

function bind(env: string, fallbackValue: string | null = null): () => string {
	return () => get(env, fallbackValue);
}

export const azureTenantIdEnv = bind("AZURE_TENANT_ID");
export const azureClientIdEnv = bind("AZURE_CLIENT_ID");
export const azureClientSecretEnv = bind("AZURE_CLIENT_SECRET");

export const defaultSiteIdEnv = bind("SHAREPOINT_DEFAULT_SITE_ID");
export const defaultDriveIdEnv = bind("SHAREPOINT_DEFAULT_DRIVE_ID");

export const httpProxyEnv = bind("HTTP_PROXY", "");
