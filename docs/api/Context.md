[Microsoft Graph SDK](README.md) / context

# context

Context creation and management utilities for Microsoft Graph API authentication.

## Functions

### createAccessTokenContext()

> **createAccessTokenContext**(`accessToken`): [`ContextRef`](Context-1.md#contextref)

Defined in: [src/services/context.ts:30](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/context.ts#L30)

Create a context using a static access token.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `accessToken` | [`AccessToken`](AccessToken.md#accesstoken) |

#### Returns

[`ContextRef`](Context-1.md#contextref)

#### Remarks

You must manually handle renewal of the access token with this approach.

***

### createClientSecretContext()

> **createClientSecretContext**(`tenantId`, `clientId`, `clientSecret`, `scope`): [`ContextRef`](Context-1.md#contextref)

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

[`ContextRef`](Context-1.md#contextref)

***

### createContext()

> **createContext**(`accessTokenGenerator`): [`ContextRef`](Context-1.md#contextref)

Defined in: [src/services/context.ts:37](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/context.ts#L37)

Create a context using a given access token generator.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `accessTokenGenerator` | [`AccessTokenGenerator`](AccessTokenGenerator.md#accesstokengenerator) |

#### Returns

[`ContextRef`](Context-1.md#contextref)

***

### createDefaultClientSecretContext()

> **createDefaultClientSecretContext**(): [`ContextRef`](Context-1.md#contextref)

Defined in: [src/services/context.ts:48](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/context.ts#L48)

Create a context using the client secret credential using environment variables AZURE_TENANT_ID, AZURE_CLIENT_ID and AZURE_CLIENT_SECRET.

#### Returns

[`ContextRef`](Context-1.md#contextref)

***

### ~~getDefaultContextRef()~~

> **getDefaultContextRef**(): [`ContextRef`](Context-1.md#contextref)

Defined in: [src/services/context.ts:59](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/context.ts#L59)

#### Returns

[`ContextRef`](Context-1.md#contextref)

#### Deprecated

Use `createDefaultClientSecretContext()` instead.

***

### ~~register()~~

> **register**(`tenantId`, `clientId`, `clientSecret`): [`ContextRef`](Context-1.md#contextref)

Defined in: [src/services/context.ts:66](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/context.ts#L66)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `tenantId` | [`AzureTenantId`](AzureApplicationCredentials-1.md#azuretenantid) |
| `clientId` | [`AzureClientId`](AzureApplicationCredentials-1.md#azureclientid) |
| `clientSecret` | [`AzureClientSecret`](AzureApplicationCredentials-1.md#azureclientsecret) |

#### Returns

[`ContextRef`](Context-1.md#contextref)

#### Deprecated

Use `createClientSecretContext()` instead.
