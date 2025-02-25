import { injectable } from "inversify";

@injectable()
export default class Configuration {
    public readonly azureTenantId: string;
    public readonly azureClientId: string;
    public readonly azureClientSecret: string;
    public readonly azureScopes: string;

    public constructor() {
        this.azureTenantId = Configuration.requireString("AZURE_TENANT_ID");
        this.azureClientId = Configuration.requireString("AZURE_CLIENT_ID");
        this.azureClientSecret = Configuration.requireString("AZURE_CLIENT_SECRET");
        this.azureScopes = Configuration.optionalString("AZURE_SCOPES") ?? "https://graph.microsoft.com/.default"
        Object.freeze(this);
    }

    private static requireString(env: string): string {
        const value = Configuration.optionalString(env)
        if (value === null) {
            // eslint-disable-next-line no-console
            console.error(`\x1b[31mEnvironment variable '${env}' missing or empty.\x1b[0m`);
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            process.exit(1);
        }
        return value;
    }

    private static optionalString(env: string): string | null {
        const value = process.env[env];
        // eslint-disable-next-line no-undefined
        if (value === undefined) return null;
        if (value.trim() === "") return null;
        return value;
    }
}