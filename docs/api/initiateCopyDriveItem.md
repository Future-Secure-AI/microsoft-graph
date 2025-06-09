[Microsoft Graph SDK](README.md) / initiateCopyDriveItem

# initiateCopyDriveItem

Initiate an asynchronous copy of an item.

## Functions

### initiateCopyDriveItem()

> **initiateCopyDriveItem**(`srcFileRef`, `dstFolderRef`, `dstFileName`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/driveItem/initiateCopyDriveItem.ts:22](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/driveItem/initiateCopyDriveItem.ts#L22)

Initiate an asynchronous copy of an item.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `srcFileRef` | [`DriveItemRef`](DriveItemRef.md#driveitemref) | Reference to the source file to be copied. |
| `dstFolderRef` | [`DriveRef`](DriveRef.md#driveref) \| [`DriveItemRef`](DriveItemRef.md#driveitemref) | Reference to the destination folder or site (if targeting root). |
| `dstFileName` | `string` | Name of the created file. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`void`\>

Nothing. The copied file may not be immediately available, and polling is required.

#### Remarks

The copied file may not be immediately available and polling is required. YOU PROBABLY WANT `copyDriveItem` INSTEAD.

#### See

https://learn.microsoft.com/en-us/graph/api/driveitem-copy
