[Microsoft Graph SDK](README.md) / getDriveItemByPath

# getDriveItemByPath

Retrieve the metadata for an item in a drive by file path.

## Functions

### getDriveItemByPath()

> **getDriveItemByPath**(`driveRef`, `itemPath`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`DriveItem` & [`SiteRef`](Site-1.md#siteref) & `object` & `object`\>

Defined in: [src/operations/driveItem/getDriveItemByPath.ts:22](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/driveItem/getDriveItemByPath.ts#L22)

Retrieve the metadata for an item in a drive by file path.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `driveRef` | [`DriveRef`](Drive-1.md#driveref) | Reference to the drive containing the item. |
| `itemPath` | [`DriveItemPath`](DriveItem-1.md#driveitempath) | Path of the item within the drive. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`DriveItem` & [`SiteRef`](Site-1.md#siteref) & `object` & `object`\>

The metadata of the specified drive item, including its reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/driveitem-get
