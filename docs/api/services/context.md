[Microsoft Graph SDK](../README.md) / services/context

## Functions

### createAccessTokenContext()

> **createAccessTokenContext**(`accessToken`): [`ContextRef`](../models/ContextRef.md#contextref)

Defined in: [src/services/context.ts:24](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/context.ts#L24)

Create a context using a static access token.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `accessToken` | [`AccessToken`](../AccessToken.md#accesstoken) |

#### Returns

[`ContextRef`](../models/ContextRef.md#contextref)

#### Remarks

You must manually handle renewal of the access token with this approach.

***

### createClientSecretContext()

> **createClientSecretContext**(`tenantId`, `clientId`, `clientSecret`, `scope`): [`ContextRef`](../models/ContextRef.md#contextref)

Defined in: [src/services/context.ts:12](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/context.ts#L12)

Create a context using the client secret credential.

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `tenantId` | [`AzureTenantId`](../AzureApplicationCredentials.md#azuretenantid) | `undefined` |
| `clientId` | [`AzureClientId`](../AzureApplicationCredentials.md#azureclientid) | `undefined` |
| `clientSecret` | [`AzureClientSecret`](../AzureApplicationCredentials.md#azureclientsecret) | `undefined` |
| `scope` | [`Scope`](../AzureApplicationCredentials.md#scope) | `defaultScope` |

#### Returns

[`ContextRef`](../models/ContextRef.md#contextref)

***

### createContext()

> **createContext**(`accessTokenGenerator`): [`ContextRef`](../models/ContextRef.md#contextref)

Defined in: [src/services/context.ts:32](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/context.ts#L32)

Create a context using a given access token generator.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `accessTokenGenerator` | [`AccessTokenGenerator`](../AccessTokenGenerator.md#accesstokengenerator) |

#### Returns

[`ContextRef`](../models/ContextRef.md#contextref)

***

### createDefaultClientSecretContext()

> **createDefaultClientSecretContext**(): [`ContextRef`](../models/ContextRef.md#contextref)

Defined in: [src/services/context.ts:43](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/context.ts#L43)

Create a context using the client secret credential using environment variables AZURE_TENANT_ID, AZURE_CLIENT_ID and AZURE_CLIENT_SECRET.

#### Returns

[`ContextRef`](../models/ContextRef.md#contextref)

***

### ~~getDefaultContextRef()~~

> **getDefaultContextRef**(): [`ContextRef`](../models/ContextRef.md#contextref)

Defined in: [src/services/context.ts:54](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/context.ts#L54)

#### Returns

[`ContextRef`](../models/ContextRef.md#contextref)

#### Deprecated

Use `createDefaultClientSecretContext()` instead.

***

### ~~register()~~

> **register**(`tenantId`, `clientId`, `clientSecret`): [`ContextRef`](../models/ContextRef.md#contextref)

Defined in: [src/services/context.ts:61](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/context.ts#L61)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `tenantId` | [`AzureTenantId`](../AzureApplicationCredentials.md#azuretenantid) |
| `clientId` | [`AzureClientId`](../AzureApplicationCredentials.md#azureclientid) |
| `clientSecret` | [`AzureClientSecret`](../AzureApplicationCredentials.md#azureclientsecret) |

#### Returns

[`ContextRef`](../models/ContextRef.md#contextref)

#### Deprecated

Use `createClientSecretContext()` instead.
