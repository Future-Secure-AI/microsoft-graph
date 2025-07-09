[Microsoft Graph SDK](README.md) / context

# context

Context creation and management utilities for Microsoft Graph API authentication.

## Functions

### ~~createAccessTokenContext()~~

> **createAccessTokenContext**(`accessToken`): [`ContextRef`](Context-1.md#contextref)

Defined in: [src/services/context.ts:42](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/context.ts#L42)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `accessToken` | [`AccessToken`](AccessToken.md#accesstoken) |

#### Returns

[`ContextRef`](Context-1.md#contextref)

#### Deprecated

Use `createContext(accessTokenGenerator)` instead.

***

### ~~createClientSecretContext()~~

> **createClientSecretContext**(`tenantId`, `clientId`, `clientSecret`, `scope`): [`ContextRef`](Context-1.md#contextref)

Defined in: [src/services/context.ts:31](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/context.ts#L31)

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `tenantId` | [`AzureTenantId`](AzureApplicationCredentials.md#azuretenantid) | `undefined` |
| `clientId` | [`AzureClientId`](AzureApplicationCredentials.md#azureclientid) | `undefined` |
| `clientSecret` | [`AzureClientSecret`](AzureApplicationCredentials.md#azureclientsecret) | `undefined` |
| `scope` | [`Scope`](AzureApplicationCredentials.md#scope) | `defaultScope` |

#### Returns

[`ContextRef`](Context-1.md#contextref)

#### Deprecated

Use `createContext(accessTokenGenerator)` instead.

***

### createContext()

> **createContext**(`accessTokenGenerator`): [`ContextRef`](Context-1.md#contextref)

Defined in: [src/services/context.ts:18](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/context.ts#L18)

Create a context using a given access token generator.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `accessTokenGenerator` | [`AccessTokenGenerator`](AccessTokenGenerator.md#accesstokengenerator) |

#### Returns

[`ContextRef`](Context-1.md#contextref)

***

### ~~createDefaultClientSecretContext()~~

> **createDefaultClientSecretContext**(): [`ContextRef`](Context-1.md#contextref)

Defined in: [src/services/context.ts:51](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/context.ts#L51)

#### Returns

[`ContextRef`](Context-1.md#contextref)

#### Deprecated

Use `createContext(accessTokenGenerator)` instead.

***

### ~~getDefaultContextRef()~~

> **getDefaultContextRef**(): [`ContextRef`](Context-1.md#contextref)

Defined in: [src/services/context.ts:62](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/context.ts#L62)

#### Returns

[`ContextRef`](Context-1.md#contextref)

#### Deprecated

Use `createContext(accessTokenGenerator)` instead.

***

### ~~register()~~

> **register**(`tenantId`, `clientId`, `clientSecret`): [`ContextRef`](Context-1.md#contextref)

Defined in: [src/services/context.ts:69](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/context.ts#L69)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `tenantId` | [`AzureTenantId`](AzureApplicationCredentials.md#azuretenantid) |
| `clientId` | [`AzureClientId`](AzureApplicationCredentials.md#azureclientid) |
| `clientSecret` | [`AzureClientSecret`](AzureApplicationCredentials.md#azureclientsecret) |

#### Returns

[`ContextRef`](Context-1.md#contextref)

#### Deprecated

Use `createContext(accessTokenGenerator)` instead.
