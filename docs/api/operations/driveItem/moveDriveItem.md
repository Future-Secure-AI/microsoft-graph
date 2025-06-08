[Microsoft Graph SDK](../../README.md) / operations/driveItem/moveDriveItem

## Functions

### moveDriveItem()

> **moveDriveItem**(`srcFileRef`, `dstFolderRef`, `dstFileName`): [`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/driveItem/moveDriveItem.ts:16](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/driveItem/moveDriveItem.ts#L16)

Moves a file to a new location in the same drive.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `srcFileRef` | [`DriveItemRef`](../../models/DriveItemRef.md#driveitemref) | A reference to the source file to be copied. |
| `dstFolderRef` | [`DriveRef`](../../models/DriveRef.md#driveref) \| [`DriveItemRef`](../../models/DriveItemRef.md#driveitemref) | A reference to the destination folder or site (if targeting root). |
| `dstFileName` | `string` | The name of the copied file. |

#### Returns

[`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`void`\>

new DriveItemRef.

#### See

https://learn.microsoft.com/en-us/graph/api/driveitem-move
