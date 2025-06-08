[Microsoft Graph SDK](../../modules.md) / operations/drive/createFolder

## Functions

### createFolder()

> **createFolder**(`parentRef`, `folderName`): [`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`DriveItem` & [`SiteRef`](../../models/SiteRef.md#siteref) & `object` & `object`\>

Defined in: [src/operations/drive/createFolder.ts:18](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/operations/drive/createFolder.ts#L18)

Create a folder in the root of a drive, or in a folder. If it already exists do nothing.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `parentRef` | [`DriveRef`](../../models/DriveRef.md#driveref) \| [`DriveItemRef`](../../models/DriveItemRef.md#driveitemref) | A reference to the parent drive or folder where the folder will be created. |
| `folderName` | `string` | The name of the folder to be created. |

#### Returns

[`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`DriveItem` & [`SiteRef`](../../models/SiteRef.md#siteref) & `object` & `object`\>

The newly created folder, including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/driveitem-post-children
