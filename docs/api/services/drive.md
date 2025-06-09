[Microsoft Graph SDK](../README.md) / services/drive

## Functions

### createClientSecretContextWithDriveRef()

> **createClientSecretContextWithDriveRef**(`tenantId`, `clientId`, `clientSecret`, `siteId`, `driveId`): [`DriveRef`](../models/DriveRef.md#driveref)

Defined in: [src/services/drive.ts:31](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/drive.ts#L31)

Creates a context with a reference to a drive.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `tenantId` | [`AzureTenantId`](../AzureApplicationCredentials.md#azuretenantid) |
| `clientId` | [`AzureClientId`](../AzureApplicationCredentials.md#azureclientid) |
| `clientSecret` | [`AzureClientSecret`](../AzureApplicationCredentials.md#azureclientsecret) |
| `siteId` | [`SiteId`](../models/SiteId.md#siteid) |
| `driveId` | [`DriveId`](../models/DriveId.md#driveid) |

#### Returns

[`DriveRef`](../models/DriveRef.md#driveref)

***

### createDriveRef()

> **createDriveRef**(`siteRef`, `driveId`): [`DriveRef`](../models/DriveRef.md#driveref)

Defined in: [src/services/drive.ts:18](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/drive.ts#L18)

Creates a reference to a drive.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `siteRef` | [`SiteRef`](../models/SiteRef.md#siteref) | The reference to the site. |
| `driveId` | `undefined` \| [`DriveId`](../models/DriveId.md#driveid) | The ID of the drive. |

#### Returns

[`DriveRef`](../models/DriveRef.md#driveref)

A reference to the drive.

#### Throws

ProtocolError if the drive ID is missing.

***

### ~~getDefaultDriveRef()~~

> **getDefaultDriveRef**(): [`DriveRef`](../models/DriveRef.md#driveref)

Defined in: [src/services/drive.ts:44](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/drive.ts#L44)

Retrieves the opinionated default drive reference. NOT RECOMMENDED FOR PRODUCTION USE.

#### Returns

[`DriveRef`](../models/DriveRef.md#driveref)

A reference to the default drive.

#### Remarks

This method is opinionated and not recommended for production use.

#### Deprecated

Use `createClientSecretContextWithDriveRef()` instead.
