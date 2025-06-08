[Microsoft Graph SDK](../../modules.md) / operations/driveItem/createDriveItem

## Functions

### createDriveItem()

> **createDriveItem**(`parentRef`, `itemPath`, `contextType`, `content`): [`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`DriveItem` & [`SiteRef`](../../models/SiteRef.md#siteref) & `object` & `object`\>

Defined in: [src/operations/driveItem/createDriveItem.ts:19](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/operations/driveItem/createDriveItem.ts#L19)

Creates new drive item in the specified parent drive or folder. If the file already exists, it will be replaced.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `parentRef` | [`DriveRef`](../../models/DriveRef.md#driveref) \| [`DriveItemRef`](../../models/DriveItemRef.md#driveitemref) | A reference to the parent drive or folder where the workbook will be created. |
| `itemPath` | [`DriveItemPath`](../../models/DriveItemPath.md#driveitempath) | The path (including the filename) for the new workbook. |
| `contextType` | `string` | - |
| `content` | [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) | - |

#### Returns

[`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`DriveItem` & [`SiteRef`](../../models/SiteRef.md#siteref) & `object` & `object`\>

The newly created workbook, including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/driveitem-put-content
