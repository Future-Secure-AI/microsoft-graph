import EnvironmentVariableMissingError from "../errors/EnvironmentVariableMissingError.ts";

export function getEnvironmentVariable(env: string, fallbackValue: string | null = null): string {
	const value = process.env[env]?.trim() ?? "";

	if (value === "") {
		if (fallbackValue === null) {
			throw new EnvironmentVariableMissingError(env);
		}
		return fallbackValue ?? "";
	}

	return value;
}

export function  bindEnvironmentVariable(env: string, fallbackValue: string | null = null): () => string {
	return () => getEnvironmentVariable(env, fallbackValue);
}

export const azureTenantIdEnv = bindEnvironmentVariable("AZURE_TENANT_ID");
export const azureClientIdEnv = bindEnvironmentVariable("AZURE_CLIENT_ID");
export const azureClientSecretEnv = bindEnvironmentVariable("AZURE_CLIENT_SECRET");

export const defaultSiteIdEnv = bindEnvironmentVariable("SHAREPOINT_DEFAULT_SITE_ID");
export const defaultDriveIdEnv = bindEnvironmentVariable("SHAREPOINT_DEFAULT_DRIVE_ID");

export const httpProxyEnv = bindEnvironmentVariable("HTTP_PROXY", "");
