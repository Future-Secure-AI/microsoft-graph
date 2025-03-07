const failedBinding: string[] = [];

const tryBindString = (env: string, defaultValue: string | null = null): string => {
    const value = process.env[env]?.trim() ?? "";

    if (value === "") {
        if (defaultValue === null) failedBinding.push(env);
        return defaultValue ?? "";
    }

    return value;
};

export const azureTenantId: string = tryBindString("AZURE_TENANT_ID");
export const azureClientId: string = tryBindString("AZURE_CLIENT_ID");
export const azureClientSecret: string = tryBindString("AZURE_CLIENT_SECRET");
export const azureScope: string = tryBindString("AZURE_SCOPE", "https://graph.microsoft.com/.default");

if (failedBinding.length > 0) {
    console.error(`\x1b[31mFATAL: Environment variable(s) ${failedBinding.join(", ")} missing or empty.\x1b[0m`);
    process.exit(1);
}
