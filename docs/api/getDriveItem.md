[Microsoft Graph SDK](README.md) / getDriveItem

# getDriveItem

Retrieve the metadata for an item in a drive.

## Functions

### getDriveItem()

> **getDriveItem**(`itemRef`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`DriveItem` & [`SiteRef`](Site-1.md#siteref) & `object` & `object`\>

Defined in: [src/operations/driveItem/getDriveItem.ts:19](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/driveItem/getDriveItem.ts#L19)

Retrieve the metadata for an item in a drive.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `itemRef` | [`DriveItemRef`](DriveItem-1.md#driveitemref) | Reference to the drive item. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`DriveItem` & [`SiteRef`](Site-1.md#siteref) & `object` & `object`\>

The metadata of the specified drive item, including its reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/driveitem-get
