import { injectable } from "inversify";
import EnvironmentVariableMissingError from "../errors/EnvironmentVariableMissingError.js";

@injectable()
export default class Configuration {
    public readonly azureTenantId: string;
    public readonly azureClientId: string;
    public readonly azureClientSecret: string;
    public readonly scopes = ['https://graph.microsoft.com/.default'];

    constructor() {
        this.azureTenantId = this.requireString("AZURE_TENANT_ID");
        this.azureClientId = this.requireString("AZURE_CLIENT_ID");
        this.azureClientSecret = this.requireString("AZURE_CLIENT_SECRET");
        Object.freeze(this);
    }

    private requireString(env: string): string {
        const value = process.env[env];
        if (!value) throw new EnvironmentVariableMissingError(env);
        return value;
    }
}