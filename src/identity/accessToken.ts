import { type AccessToken as InnerAccessToken, ClientSecretCredential } from "@azure/identity";
import { azureClientId, azureClientSecret, azureScope, azureTenantId } from "../configuration.js";

export type AccessToken = string & { __brand: "AccessToken" };

const credential = new ClientSecretCredential(azureTenantId, azureClientId, azureClientSecret)
let lastAccessToken: InnerAccessToken | null = null;

/**
 * Get the current access token. Do not store this token as it may expire.
 */
export const getCurrentAccessToken = async (): Promise<AccessToken> => {
    if (lastAccessToken === null || lastAccessToken.expiresOnTimestamp < Date.now())
        // eslint-disable-next-line require-atomic-updates
        lastAccessToken = await credential.getToken(azureScope);

    return lastAccessToken.token as AccessToken;
}

