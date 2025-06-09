[Microsoft Graph SDK](README.md) / drive

Utilities for working with Microsoft Graph Drive references and operations.

## Functions

### createClientSecretContextWithDriveRef()

> **createClientSecretContextWithDriveRef**(`tenantId`, `clientId`, `clientSecret`, `siteId`, `driveId`): [`DriveRef`](DriveRef.md#driveref)

Defined in: [src/services/drive.ts:37](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/drive.ts#L37)

Creates a context with a reference to a drive.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `tenantId` | [`AzureTenantId`](AzureApplicationCredentials-1.md#azuretenantid) |
| `clientId` | [`AzureClientId`](AzureApplicationCredentials-1.md#azureclientid) |
| `clientSecret` | [`AzureClientSecret`](AzureApplicationCredentials-1.md#azureclientsecret) |
| `siteId` | [`SiteId`](SiteId.md#siteid) |
| `driveId` | [`DriveId`](DriveId.md#driveid) |

#### Returns

[`DriveRef`](DriveRef.md#driveref)

***

### createDriveRef()

> **createDriveRef**(`siteRef`, `driveId`): [`DriveRef`](DriveRef.md#driveref)

Defined in: [src/services/drive.ts:24](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/drive.ts#L24)

Creates a reference to a drive.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `siteRef` | [`SiteRef`](SiteRef.md#siteref) | The reference to the site. |
| `driveId` | `undefined` \| [`DriveId`](DriveId.md#driveid) | The ID of the drive. |

#### Returns

[`DriveRef`](DriveRef.md#driveref)

A reference to the drive.

#### Throws

ProtocolError if the drive ID is missing.

***

### ~~getDefaultDriveRef()~~

> **getDefaultDriveRef**(): [`DriveRef`](DriveRef.md#driveref)

Defined in: [src/services/drive.ts:50](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/drive.ts#L50)

Retrieves the opinionated default drive reference. NOT RECOMMENDED FOR PRODUCTION USE.

#### Returns

[`DriveRef`](DriveRef.md#driveref)

A reference to the default drive.

#### Remarks

This method is opinionated and not recommended for production use.

#### Deprecated

Use `createClientSecretContextWithDriveRef()` instead.
