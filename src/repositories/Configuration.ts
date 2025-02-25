import { injectable } from "inversify";

@injectable()
export default class Configuration {
    public readonly azureTenantId: string;
    public readonly azureClientId: string;
    public readonly azureClientSecret: string;
    public readonly azureScopes: string;
    private readonly failedBinding: string[] = [];

    public constructor() {
        this.azureTenantId = this.tryBindString("AZURE_TENANT_ID");
        this.azureClientId = this.tryBindString("AZURE_CLIENT_ID");
        this.azureClientSecret = this.tryBindString("AZURE_CLIENT_SECRET");
        this.azureScopes = this.tryBindString("AZURE_SCOPES", "https://graph.microsoft.com/.default")

        this.faultOnFailedBindings();
        Object.freeze(this);
    }

    private tryBindString(env: string, defaultValue: string | null = null): string {
        const value = process.env[env]?.trim() ?? "";

        if (value === "") {
            if (defaultValue === null) this.failedBinding.push(env);
            return defaultValue ?? "";
        }

        return value;
    }

    private faultOnFailedBindings(): void {
        if (this.failedBinding.length === 0) return;

        // eslint-disable-next-line no-console
        console.error(`\x1b[31mFATAL: Environment variable(s) ${this.failedBinding.join(", ")} missing or empty.\x1b[0m`);
        process.exit(1);
    }
}