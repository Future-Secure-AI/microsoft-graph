[Microsoft Graph SDK](README.md) / azureApplicationCredentials

# azureApplicationCredentials

Azure application credential helpers for authentication and token management.

## Functions

### getCurrentAccessToken()

> **getCurrentAccessToken**(`tenantId`, `clientId`, `clientSecret`, `scope`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`AccessToken`](AccessToken.md#accesstoken)\>

Defined in: [src/services/azureApplicationCredentials.ts:22](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/azureApplicationCredentials.ts#L22)

Retrieves the current access token for a given client and scope.
If a valid token is cached, it will be returned; otherwise, a new token will be requested.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tenantId` | [`AzureTenantId`](AzureApplicationCredentials-1.md#azuretenantid) | The tenant ID. |
| `clientId` | [`AzureClientId`](AzureApplicationCredentials-1.md#azureclientid) | The client ID. |
| `clientSecret` | [`AzureClientSecret`](AzureApplicationCredentials-1.md#azureclientsecret) | The client secret. |
| `scope` | [`Scope`](AzureApplicationCredentials-1.md#scope) | The scope for which the token is requested. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`AccessToken`](AccessToken.md#accesstoken)\>

A promise that resolves to the access token.
