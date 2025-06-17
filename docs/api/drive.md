[Microsoft Graph SDK](README.md) / drive

# drive

Utilities for working with Microsoft Graph Drive references and operations.

## Functions

### createClientSecretContextWithDriveRef()

> **createClientSecretContextWithDriveRef**(`tenantId`, `clientId`, `clientSecret`, `siteId`, `driveId`): [`DriveRef`](Drive-1.md#driveref)

Defined in: [src/services/drive.ts:35](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/drive.ts#L35)

Creates a context with a reference to a drive.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `tenantId` | [`AzureTenantId`](AzureApplicationCredentials-1.md#azuretenantid) |
| `clientId` | [`AzureClientId`](AzureApplicationCredentials-1.md#azureclientid) |
| `clientSecret` | [`AzureClientSecret`](AzureApplicationCredentials-1.md#azureclientsecret) |
| `siteId` | [`SiteId`](Site-1.md#siteid) |
| `driveId` | [`DriveId`](Drive-1.md#driveid) |

#### Returns

[`DriveRef`](Drive-1.md#driveref)

***

### createDriveRef()

> **createDriveRef**(`siteRef`, `driveId`): [`DriveRef`](Drive-1.md#driveref)

Defined in: [src/services/drive.ts:22](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/drive.ts#L22)

Creates a reference to a drive.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `siteRef` | [`SiteRef`](Site-1.md#siteref) | The reference to the site. |
| `driveId` | `undefined` \| [`DriveId`](Drive-1.md#driveid) | The ID of the drive. |

#### Returns

[`DriveRef`](Drive-1.md#driveref)

A reference to the drive.

#### Throws

ProtocolError if the drive ID is missing.

***

### getDefaultDriveRef()

> **getDefaultDriveRef**(): [`DriveRef`](Drive-1.md#driveref)

Defined in: [src/services/drive.ts:47](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/drive.ts#L47)

Retrieves the opinionated default drive reference. NOT RECOMMENDED FOR PRODUCTION USE.

#### Returns

[`DriveRef`](Drive-1.md#driveref)

A reference to the default drive.

#### Remarks

This method is opinionated and not recommended for production use.
