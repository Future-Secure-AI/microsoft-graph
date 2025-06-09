[Microsoft Graph SDK](README.md) / moveDriveItem

# moveDriveItem

Moves a file to a new location in the same drive.

## Functions

### moveDriveItem()

> **moveDriveItem**(`srcFileRef`, `dstFolderRef`, `dstFileName`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/driveItem/moveDriveItem.ts:20](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/driveItem/moveDriveItem.ts#L20)

Moves a file to a new location in the same drive.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `srcFileRef` | [`DriveItemRef`](DriveItemRef.md#driveitemref) | Reference to the source file to be copied. |
| `dstFolderRef` | [`DriveRef`](DriveRef.md#driveref) \| [`DriveItemRef`](DriveItemRef.md#driveitemref) | Reference to the destination folder or site (if targeting root). |
| `dstFileName` | `string` | Name of the copied file. * |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`void`\>

#### See

https://learn.microsoft.com/en-us/graph/api/driveitem-move
