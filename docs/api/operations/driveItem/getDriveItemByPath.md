[Microsoft Graph SDK](../../modules.md) / operations/driveItem/getDriveItemByPath

## Functions

### getDriveItemByPath()

> **getDriveItemByPath**(`driveRef`, `itemPath`): [`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`DriveItem` & [`SiteRef`](../../models/SiteRef.md#siteref) & `object` & `object`\>

Defined in: [src/operations/driveItem/getDriveItemByPath.ts:19](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/operations/driveItem/getDriveItemByPath.ts#L19)

Retrieve the metadata for an item in a drive by file path.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `driveRef` | [`DriveRef`](../../models/DriveRef.md#driveref) | A reference to the drive containing the item. |
| `itemPath` | [`DriveItemPath`](../../models/DriveItemPath.md#driveitempath) | The file path of the item within the drive. |

#### Returns

[`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`DriveItem` & [`SiteRef`](../../models/SiteRef.md#siteref) & `object` & `object`\>

The metadata of the specified drive item, including its reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/driveitem-get
