[Microsoft Graph SDK](README.md) / getDriveItemByPath

# getDriveItemByPath

Retrieve the metadata for an item in a drive by file path.

## Functions

### getDriveItemByPath()

> **getDriveItemByPath**(`parentRef`, `itemPath`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`DriveItem` & [`SiteRef`](Site-1.md#siteref) & `object` & `object`\>

Defined in: [src/operations/driveItem/getDriveItemByPath.ts:23](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/driveItem/getDriveItemByPath.ts#L23)

Retrieve the metadata for an item in a drive by file path.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `parentRef` | [`DriveRef`](Drive-1.md#driveref) \| [`DriveItemRef`](DriveItem-1.md#driveitemref) | Reference to the drive or drive item containing the item. |
| `itemPath` | [`DriveItemPath`](DriveItem-1.md#driveitempath) | Path of the item within the drive. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`DriveItem` & [`SiteRef`](Site-1.md#siteref) & `object` & `object`\>

The metadata of the specified drive item, including its reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/driveitem-get
