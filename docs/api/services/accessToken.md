[Microsoft Graph SDK](../README.md) / services/accessToken

## Functions

### getCurrentAccessToken()

> **getCurrentAccessToken**(`tenantId`, `clientId`, `clientSecret`, `scope`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`AccessToken`](../AccessToken.md#accesstoken)\>

Defined in: [src/services/accessToken.ts:19](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/accessToken.ts#L19)

Retrieves the current access token for a given client and scope.
If a valid token is cached, it will be returned; otherwise, a new token will be requested.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tenantId` | [`TenantId`](../models/TenantId.md#tenantid) | The tenant ID. |
| `clientId` | [`ClientId`](../models/ClientId.md#clientid) | The client ID. |
| `clientSecret` | [`ClientSecret`](../models/ClientSecret.md#clientsecret) | The client secret. |
| `scope` | [`Scope`](../models/Scope.md#scope) | The scope for which the token is requested. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`AccessToken`](../AccessToken.md#accesstoken)\>

A promise that resolves to the access token.
