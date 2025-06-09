[Microsoft Graph SDK](README.md) / context

# context

Context creation and management utilities for Microsoft Graph API authentication.

## Functions

### createAccessTokenContext()

> **createAccessTokenContext**(`accessToken`): [`ContextRef`](ContextRef.md#contextref)

Defined in: [src/services/context.ts:30](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/context.ts#L30)

Create a context using a static access token.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `accessToken` | [`AccessToken`](AccessToken.md#accesstoken) |

#### Returns

[`ContextRef`](ContextRef.md#contextref)

#### Remarks

You must manually handle renewal of the access token with this approach.

***

### createClientSecretContext()

> **createClientSecretContext**(`tenantId`, `clientId`, `clientSecret`, `scope`): [`ContextRef`](ContextRef.md#contextref)

Defined in: [src/services/context.ts:18](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/context.ts#L18)

Create a context using the client secret credential.

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `tenantId` | [`AzureTenantId`](AzureApplicationCredentials-1.md#azuretenantid) | `undefined` |
| `clientId` | [`AzureClientId`](AzureApplicationCredentials-1.md#azureclientid) | `undefined` |
| `clientSecret` | [`AzureClientSecret`](AzureApplicationCredentials-1.md#azureclientsecret) | `undefined` |
| `scope` | [`Scope`](AzureApplicationCredentials-1.md#scope) | `defaultScope` |

#### Returns

[`ContextRef`](ContextRef.md#contextref)

***

### createContext()

> **createContext**(`accessTokenGenerator`): [`ContextRef`](ContextRef.md#contextref)

Defined in: [src/services/context.ts:38](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/context.ts#L38)

Create a context using a given access token generator.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `accessTokenGenerator` | [`AccessTokenGenerator`](AccessTokenGenerator.md#accesstokengenerator) |

#### Returns

[`ContextRef`](ContextRef.md#contextref)

***

### createDefaultClientSecretContext()

> **createDefaultClientSecretContext**(): [`ContextRef`](ContextRef.md#contextref)

Defined in: [src/services/context.ts:49](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/context.ts#L49)

Create a context using the client secret credential using environment variables AZURE_TENANT_ID, AZURE_CLIENT_ID and AZURE_CLIENT_SECRET.

#### Returns

[`ContextRef`](ContextRef.md#contextref)

***

### ~~getDefaultContextRef()~~

> **getDefaultContextRef**(): [`ContextRef`](ContextRef.md#contextref)

Defined in: [src/services/context.ts:60](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/context.ts#L60)

#### Returns

[`ContextRef`](ContextRef.md#contextref)

#### Deprecated

Use `createDefaultClientSecretContext()` instead.

***

### ~~register()~~

> **register**(`tenantId`, `clientId`, `clientSecret`): [`ContextRef`](ContextRef.md#contextref)

Defined in: [src/services/context.ts:67](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/context.ts#L67)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `tenantId` | [`AzureTenantId`](AzureApplicationCredentials-1.md#azuretenantid) |
| `clientId` | [`AzureClientId`](AzureApplicationCredentials-1.md#azureclientid) |
| `clientSecret` | [`AzureClientSecret`](AzureApplicationCredentials-1.md#azureclientsecret) |

#### Returns

[`ContextRef`](ContextRef.md#contextref)

#### Deprecated

Use `createClientSecretContext()` instead.
