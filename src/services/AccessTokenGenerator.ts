import { AccessToken, ClientSecretCredential } from "@azure/identity";
import { inject, injectable } from "inversify";
import Configuration from "../repositories/Configuration.js";

@injectable()
export default class AccessTokenGenerator {
    private readonly credential: ClientSecretCredential;
    private lastAccessToken: AccessToken | undefined;

    public constructor(
        @inject(Configuration)
        public readonly configuration: Configuration,
    ) {
        this.credential = new ClientSecretCredential(configuration.azureTenantId, configuration.azureClientId, configuration.azureClientSecret)
    }

    public async getCurrent(): Promise<string> {
        if (!this.lastAccessToken || this.lastAccessToken.expiresOnTimestamp < Date.now())
            this.lastAccessToken = await this.credential.getToken(this.configuration.azureScopes);

        return this.lastAccessToken.token;
    }
}