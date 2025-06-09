[Microsoft Graph SDK](../../README.md) / operations/drive/createFolder

## Functions

### createFolder()

> **createFolder**(`parentRef`, `folderName`): [`GraphOperation`](../../GraphOperation.md#graphoperation)\<`DriveItem` & [`SiteRef`](../../SiteRef.md#siteref) & `object` & `object`\>

Defined in: [src/operations/drive/createFolder.ts:18](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/drive/createFolder.ts#L18)

Create a folder in the root of a drive, or in a folder. If it already exists do nothing.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `parentRef` | [`DriveRef`](../../DriveRef.md#driveref) \| [`DriveItemRef`](../../DriveItemRef.md#driveitemref) | A reference to the parent drive or folder where the folder will be created. |
| `folderName` | `string` | The name of the folder to be created. |

#### Returns

[`GraphOperation`](../../GraphOperation.md#graphoperation)\<`DriveItem` & [`SiteRef`](../../SiteRef.md#siteref) & `object` & `object`\>

The newly created folder, including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/driveitem-post-children
