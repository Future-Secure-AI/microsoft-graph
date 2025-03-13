const missingEnvironmentVariables: string[] = [];

function tryGetEnvironmentVariable(env: string, fallbackValue: string | null = null): string {
	const value = process.env[env]?.trim() ?? "";

	if (value === "") {
		if (fallbackValue === null) missingEnvironmentVariables.push(env); // It's fatal if env is unset and there is no fallbackValue, however we want to report all of these in one batch..
		return fallbackValue ?? "";
	}

	return value;
}

export const azureTenantId: string = tryGetEnvironmentVariable("AZURE_TENANT_ID");
export const azureClientId: string = tryGetEnvironmentVariable("AZURE_CLIENT_ID");
export const azureClientSecret: string = tryGetEnvironmentVariable("AZURE_CLIENT_SECRET");

if (missingEnvironmentVariables.length > 0) {
	console.error(`\x1b[31mFATAL: Require environment variable(s) ${missingEnvironmentVariables.join(", ")} missing or empty.\x1b[0m`);
	process.exit(1);
}
