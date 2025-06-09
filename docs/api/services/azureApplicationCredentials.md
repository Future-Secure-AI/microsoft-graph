[Microsoft Graph SDK](../README.md) / services/azureApplicationCredentials

## Functions

### getCurrentAccessToken()

> **getCurrentAccessToken**(`tenantId`, `clientId`, `clientSecret`, `scope`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`AccessToken`](../AccessToken.md#accesstoken)\>

Defined in: [src/services/azureApplicationCredentials.ts:16](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/azureApplicationCredentials.ts#L16)

Retrieves the current access token for a given client and scope.
If a valid token is cached, it will be returned; otherwise, a new token will be requested.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tenantId` | [`AzureTenantId`](../AzureApplicationCredentials.md#azuretenantid) | The tenant ID. |
| `clientId` | [`AzureClientId`](../AzureApplicationCredentials.md#azureclientid) | The client ID. |
| `clientSecret` | [`AzureClientSecret`](../AzureApplicationCredentials.md#azureclientsecret) | The client secret. |
| `scope` | [`Scope`](../AzureApplicationCredentials.md#scope) | The scope for which the token is requested. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`AccessToken`](../AccessToken.md#accesstoken)\>

A promise that resolves to the access token.
