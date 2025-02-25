import { AccessToken, ClientSecretCredential } from "@azure/identity";
import { inject, injectable } from "inversify";
import Configuration from "../repositories/Configuration.js";

@injectable()
export default class AccessTokenGenerator {
    private readonly credential: ClientSecretCredential;
    private lastAccessToken: AccessToken | undefined;

    constructor(
        @inject(Configuration)
        public readonly configuration: Configuration,
    ) {
        this.credential = new ClientSecretCredential(configuration.azureTenantId, configuration.azureClientId, configuration.azureClientSecret)
    }

    public async getCurrent(): Promise<string> {
        if (!this.lastAccessToken || this.lastAccessToken.expiresOnTimestamp < Date.now()) {
            try {
                this.lastAccessToken = await this.credential.getToken(this.configuration.scopes);
            } catch (error) {
                throw new Error('Could not obtain an access token.');
            }
        }

        return this.lastAccessToken.token;
    }
}