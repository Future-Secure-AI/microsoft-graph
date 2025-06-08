[Microsoft Graph SDK](../../modules.md) / operations/driveItem/getDriveItem

## Functions

### getDriveItem()

> **getDriveItem**(`itemRef`): [`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`DriveItem` & [`SiteRef`](../../models/SiteRef.md#siteref) & `object` & `object`\>

Defined in: [src/operations/driveItem/getDriveItem.ts:14](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/operations/driveItem/getDriveItem.ts#L14)

Retrieve the metadata for an item in a drive.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `itemRef` | [`DriveItemRef`](../../models/DriveItemRef.md#driveitemref) | A reference to the drive item. |

#### Returns

[`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`DriveItem` & [`SiteRef`](../../models/SiteRef.md#siteref) & `object` & `object`\>

The metadata of the specified drive item, including its reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/driveitem-get
