[Microsoft Graph SDK](../../README.md) / operations/driveItem/initiateCopyDriveItem

## Functions

### initiateCopyDriveItem()

> **initiateCopyDriveItem**(`srcFileRef`, `dstFolderRef`, `dstFileName`): [`GraphOperation`](../../GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/driveItem/initiateCopyDriveItem.ts:16](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/driveItem/initiateCopyDriveItem.ts#L16)

Initiate an asynchronous copy of an item. NOTE: The copied file may not be immediately available and polling is required.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `srcFileRef` | [`DriveItemRef`](../../DriveItemRef.md#driveitemref) | A reference to the source file to be copied. |
| `dstFolderRef` | [`DriveRef`](../../DriveRef.md#driveref) \| [`DriveItemRef`](../../DriveItemRef.md#driveitemref) | A reference to the destination folder or site (if targeting root). |
| `dstFileName` | `string` | The name of the copied file. |

#### Returns

[`GraphOperation`](../../GraphOperation.md#graphoperation)\<`void`\>

Nothing. The copied file may not be immediately available, and polling is required.

#### See

https://learn.microsoft.com/en-us/graph/api/driveitem-copy
