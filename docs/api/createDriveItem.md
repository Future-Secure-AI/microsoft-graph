[Microsoft Graph SDK](README.md) / createDriveItem

Creates new drive item in the specified parent drive or folder.

## Functions

### createDriveItem()

> **createDriveItem**(`parentRef`, `itemPath`, `contextType`, `content`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`DriveItem` & [`SiteRef`](SiteRef.md#siteref) & `object` & `object`\>

Defined in: [src/operations/driveItem/createDriveItem.ts:25](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/driveItem/createDriveItem.ts#L25)

Creates new drive item in the specified parent drive or folder.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `parentRef` | [`DriveRef`](DriveRef.md#driveref) \| [`DriveItemRef`](DriveItemRef.md#driveitemref) | Reference to the parent drive or folder where the drive item will be created. |
| `itemPath` | [`DriveItemPath`](DriveItemPath.md#driveitempath) | Path (including the filename) for the new drive item. |
| `contextType` | `string` | - |
| `content` | [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) | - |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`DriveItem` & [`SiteRef`](SiteRef.md#siteref) & `object` & `object`\>

The newly created drive item.

#### Remarks

If the file already exists, it will be replaced.

#### See

https://learn.microsoft.com/en-us/graph/api/driveitem-put-content
