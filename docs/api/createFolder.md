[Microsoft Graph SDK](README.md) / createFolder

# createFolder

Create a folder in the root of a drive, or in a folder. If it already exists do nothing.

## Interfaces

### CreateDriveItemOptions

Defined in: [src/operations/drive/createFolder.ts:19](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/drive/createFolder.ts#L19)

Options for creating a folder.

#### Properties

##### conflictBehavior?

> `optional` **conflictBehavior**: [`ConflictBehavior`](ConflictBehavior.md#conflictbehavior)

Defined in: [src/operations/drive/createFolder.ts:20](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/drive/createFolder.ts#L20)

## Functions

### createFolder()

> **createFolder**(`parentRef`, `folderName`, `options`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`DriveItem` & [`SiteRef`](Site-1.md#siteref) & `object` & `object`\>

Defined in: [src/operations/drive/createFolder.ts:30](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/drive/createFolder.ts#L30)

Create a folder in the root of a drive, or in a folder. If it already exists do nothing.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `parentRef` | [`DriveRef`](Drive-1.md#driveref) \| [`DriveItemRef`](DriveItem-1.md#driveitemref) | Reference to the parent drive or folder where the folder will be created. |
| `folderName` | `string` | Name of the folder to be created. |
| `options` | [`CreateDriveItemOptions`](#createdriveitemoptions) | - |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`DriveItem` & [`SiteRef`](Site-1.md#siteref) & `object` & `object`\>

The newly created folder.

#### See

https://learn.microsoft.com/en-us/graph/api/driveitem-post-children
