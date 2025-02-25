import { injectable } from "inversify";
import EnvironmentVariableMissingError from "../errors/EnvironmentVariableMissingError.js";

@injectable()
export default class Configuration {
    public readonly azureTenantId: string;
    public readonly azureClientId: string;
    public readonly azureClientSecret: string;
    public readonly scopes = ['https://graph.microsoft.com/.default'];

    public constructor() {
        this.azureTenantId = Configuration.requireString("AZURE_TENANT_ID");
        this.azureClientId = Configuration.requireString("AZURE_CLIENT_ID");
        this.azureClientSecret = Configuration.requireString("AZURE_CLIENT_SECRET");
        Object.freeze(this);
    }

    private static requireString(env: string): string {
        const value = process.env[env];
        // eslint-disable-next-line no-undefined
        if (value === undefined) throw new EnvironmentVariableMissingError(env);
        if (value.trim() === "") throw new EnvironmentVariableMissingError(env);
        return value;
    }
}