[Microsoft Graph SDK](README.md) / AzureApplicationCredentials

# AzureApplicationCredentials

Credentials used to authenticate an application with Azure.

## Type Aliases

### AzureClientId

> **AzureClientId** = `string` & `object`

Defined in: [src/models/AzureApplicationCredentials.ts:10](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/AzureApplicationCredentials.ts#L10)

Application Client ID to authenticate with Azure.

#### Type declaration

##### \_\_brand

> `readonly` **\_\_brand**: unique `symbol`

***

### AzureClientSecret

> **AzureClientSecret** = `string` & `object`

Defined in: [src/models/AzureApplicationCredentials.ts:17](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/AzureApplicationCredentials.ts#L17)

Application Client secret to authenticate with Azure.

#### Type declaration

##### \_\_brand

> `readonly` **\_\_brand**: unique `symbol`

***

### AzureTenantId

> **AzureTenantId** = `string` & `object`

Defined in: [src/models/AzureApplicationCredentials.ts:24](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/AzureApplicationCredentials.ts#L24)

ID of tenant in Azure.

#### Type declaration

##### \_\_brand

> `readonly` **\_\_brand**: unique `symbol`

***

### Scope

> **Scope** = `string` & `object`

Defined in: [src/models/AzureApplicationCredentials.ts:32](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/AzureApplicationCredentials.ts#L32)

Scope for which the access token is requested.

#### Type declaration

##### \_\_brand

> `readonly` **\_\_brand**: unique `symbol`

#### Remarks

Typically, this is set to "https://graph.microsoft.com/.default" for Microsoft Graph API.
