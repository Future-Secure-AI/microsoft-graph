[Microsoft Graph SDK](README.md) / AzureApplicationCredentials

# AzureApplicationCredentials

Credentials used to authenticate an application with Azure.

## Type Aliases

### AzureClientId

> **AzureClientId** = `string` & `object`

Defined in: [src/models/AzureApplicationCredentials.ts:12](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/AzureApplicationCredentials.ts#L12)

Application Client ID to authenticate with Azure.

#### Type declaration

##### \_\_brand

> **\_\_brand**: `"AzureClientId"`

***

### AzureClientSecret

> **AzureClientSecret** = `string` & `object`

Defined in: [src/models/AzureApplicationCredentials.ts:19](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/AzureApplicationCredentials.ts#L19)

Application Client secret to authenticate with Azure.

#### Type declaration

##### \_\_brand

> **\_\_brand**: `"AzureClientSecret"`

***

### AzureTenantId

> **AzureTenantId** = `string` & `object`

Defined in: [src/models/AzureApplicationCredentials.ts:26](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/AzureApplicationCredentials.ts#L26)

ID of tenant in Azure.

#### Type declaration

##### \_\_brand

> **\_\_brand**: `"AzureTenantId"`

***

### Scope

> **Scope** = `string` & `object`

Defined in: [src/models/AzureApplicationCredentials.ts:34](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/AzureApplicationCredentials.ts#L34)

Scope for which the access token is requested.

#### Type declaration

##### \_\_brand

> **\_\_brand**: `"Scope"`

#### Remarks

Typically, this is set to "https://graph.microsoft.com/.default" for Microsoft Graph API.
