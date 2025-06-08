[Microsoft Graph SDK](../README.md) / services/drive

## Functions

### createClientSecretContextWithDriveRef()

> **createClientSecretContextWithDriveRef**(`tenantId`, `clientId`, `clientSecret`, `siteId`, `driveId`): [`DriveRef`](../models/DriveRef.md#driveref)

Defined in: [src/services/drive.ts:33](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/drive.ts#L33)

Creates a context with a reference to a drive.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `tenantId` | [`TenantId`](../models/TenantId.md#tenantid) |
| `clientId` | [`ClientId`](../models/ClientId.md#clientid) |
| `clientSecret` | [`ClientSecret`](../models/ClientSecret.md#clientsecret) |
| `siteId` | [`SiteId`](../models/SiteId.md#siteid) |
| `driveId` | [`DriveId`](../models/DriveId.md#driveid) |

#### Returns

[`DriveRef`](../models/DriveRef.md#driveref)

***

### createDriveRef()

> **createDriveRef**(`siteRef`, `driveId`): [`DriveRef`](../models/DriveRef.md#driveref)

Defined in: [src/services/drive.ts:20](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/drive.ts#L20)

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

Defined in: [src/services/drive.ts:46](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/drive.ts#L46)

Retrieves the opinionated default drive reference. NOT RECOMMENDED FOR PRODUCTION USE.

#### Returns

[`DriveRef`](../models/DriveRef.md#driveref)

A reference to the default drive.

#### Remarks

This method is opinionated and not recommended for production use.

#### Deprecated

Use `createClientSecretContextWithDriveRef()` instead.
