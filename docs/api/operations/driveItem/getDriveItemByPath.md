[Microsoft Graph SDK](../../README.md) / operations/driveItem/getDriveItemByPath

## Functions

### getDriveItemByPath()

> **getDriveItemByPath**(`driveRef`, `itemPath`): [`GraphOperation`](../../GraphOperation.md#graphoperation)\<`DriveItem` & [`SiteRef`](../../SiteRef.md#siteref) & `object` & `object`\>

Defined in: [src/operations/driveItem/getDriveItemByPath.ts:19](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/driveItem/getDriveItemByPath.ts#L19)

Retrieve the metadata for an item in a drive by file path.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `driveRef` | [`DriveRef`](../../DriveRef.md#driveref) | A reference to the drive containing the item. |
| `itemPath` | [`DriveItemPath`](../../DriveItemPath.md#driveitempath) | The file path of the item within the drive. |

#### Returns

[`GraphOperation`](../../GraphOperation.md#graphoperation)\<`DriveItem` & [`SiteRef`](../../SiteRef.md#siteref) & `object` & `object`\>

The metadata of the specified drive item, including its reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/driveitem-get
