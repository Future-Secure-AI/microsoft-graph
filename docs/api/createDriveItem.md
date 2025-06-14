[Microsoft Graph SDK](README.md) / createDriveItem

# createDriveItem

Creates new drive item in the specified parent drive or folder.

## Functions

### createDriveItem()

> **createDriveItem**(`parentRef`, `itemPath`, `contextType`, `content`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`DriveItem` & [`SiteRef`](Site-1.md#siteref) & `object` & `object`\>

Defined in: [src/operations/driveItem/createDriveItem.ts:23](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/driveItem/createDriveItem.ts#L23)

Creates new drive item in the specified parent drive or folder.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `parentRef` | [`DriveRef`](Drive-1.md#driveref) \| [`DriveItemRef`](DriveItem-1.md#driveitemref) | Reference to the parent drive or folder where the drive item will be created. |
| `itemPath` | [`DriveItemPath`](DriveItem-1.md#driveitempath) | Path (including the filename) for the new drive item. |
| `contextType` | `string` | - |
| `content` | [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) | - |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`DriveItem` & [`SiteRef`](Site-1.md#siteref) & `object` & `object`\>

The newly created drive item.

#### Remarks

If the file already exists, it will be replaced.

#### See

https://learn.microsoft.com/en-us/graph/api/driveitem-put-content
