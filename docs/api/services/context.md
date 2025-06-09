[Microsoft Graph SDK](../README.md) / services/context

## Functions

### createAccessTokenContext()

> **createAccessTokenContext**(`accessToken`): [`ContextRef`](../models/ContextRef.md#contextref)

Defined in: [src/services/context.ts:26](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/context.ts#L26)

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

Defined in: [src/services/context.ts:14](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/context.ts#L14)

Create a context using the client secret credential.

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `tenantId` | [`TenantId`](../models/TenantId.md#tenantid) | `undefined` |
| `clientId` | [`ClientId`](../models/ClientId.md#clientid) | `undefined` |
| `clientSecret` | [`ClientSecret`](../models/ClientSecret.md#clientsecret) | `undefined` |
| `scope` | [`Scope`](../models/Scope.md#scope) | `defaultScope` |

#### Returns

[`ContextRef`](../models/ContextRef.md#contextref)

***

### createContext()

> **createContext**(`accessTokenGenerator`): [`ContextRef`](../models/ContextRef.md#contextref)

Defined in: [src/services/context.ts:34](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/context.ts#L34)

Create a context using a given access token generator.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `accessTokenGenerator` | [`AccessTokenGenerator`](../models/AccessTokenGenerator.md#accesstokengenerator) |

#### Returns

[`ContextRef`](../models/ContextRef.md#contextref)

***

### createDefaultClientSecretContext()

> **createDefaultClientSecretContext**(): [`ContextRef`](../models/ContextRef.md#contextref)

Defined in: [src/services/context.ts:45](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/context.ts#L45)

Create a context using the client secret credential using environment variables AZURE_TENANT_ID, AZURE_CLIENT_ID and AZURE_CLIENT_SECRET.

#### Returns

[`ContextRef`](../models/ContextRef.md#contextref)

***

### ~~getDefaultContextRef()~~

> **getDefaultContextRef**(): [`ContextRef`](../models/ContextRef.md#contextref)

Defined in: [src/services/context.ts:56](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/context.ts#L56)

#### Returns

[`ContextRef`](../models/ContextRef.md#contextref)

#### Deprecated

Use `createDefaultClientSecretContext()` instead.

***

### ~~register()~~

> **register**(`tenantId`, `clientId`, `clientSecret`): [`ContextRef`](../models/ContextRef.md#contextref)

Defined in: [src/services/context.ts:63](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/context.ts#L63)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `tenantId` | [`TenantId`](../models/TenantId.md#tenantid) |
| `clientId` | [`ClientId`](../models/ClientId.md#clientid) |
| `clientSecret` | [`ClientSecret`](../models/ClientSecret.md#clientsecret) |

#### Returns

[`ContextRef`](../models/ContextRef.md#contextref)

#### Deprecated

Use `createClientSecretContext()` instead.
