[Microsoft Graph SDK](README.md) / createFolder

# createFolder

Create a folder in the root of a drive, or in a folder. If it already exists do nothing.

## Functions

### createFolder()

> **createFolder**(`parentRef`, `folderName`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`DriveItem` & [`SiteRef`](Site-1.md#siteref) & `object` & `object`\>

Defined in: [src/operations/drive/createFolder.ts:22](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/drive/createFolder.ts#L22)

Create a folder in the root of a drive, or in a folder. If it already exists do nothing.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `parentRef` | [`DriveRef`](Drive-1.md#driveref) \| [`DriveItemRef`](DriveItem-1.md#driveitemref) | Reference to the parent drive or folder where the folder will be created. |
| `folderName` | `string` | Name of the folder to be created. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`DriveItem` & [`SiteRef`](Site-1.md#siteref) & `object` & `object`\>

The newly created folder.

#### See

https://learn.microsoft.com/en-us/graph/api/driveitem-post-children
