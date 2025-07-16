[Microsoft Graph SDK](README.md) / deleteDriveItem

# deleteDriveItem

Delete an item from a drive.

## Type Aliases

### DeleteDriveItemOptions

> **DeleteDriveItemOptions** = `object`

Defined in: [src/operations/driveItem/deleteDriveItem.ts:17](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/driveItem/deleteDriveItem.ts#L17)

Options for deleting a drive item.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="bypasscheckedout"></a> `bypassCheckedOut?` | `boolean` | If true, bypasses the checkout condition on the driveItem. | [src/operations/driveItem/deleteDriveItem.ts:25](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/driveItem/deleteDriveItem.ts#L25) |
| <a id="bypasssharedlock"></a> `bypassSharedLock?` | `boolean` | If true, bypasses any shared locks on the driveItem (e.g., from a coauthoring session). | [src/operations/driveItem/deleteDriveItem.ts:21](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/driveItem/deleteDriveItem.ts#L21) |

## Functions

### deleteDriveItem()

> **deleteDriveItem**(`itemRef`, `options`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/driveItem/deleteDriveItem.ts:34](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/driveItem/deleteDriveItem.ts#L34)

Delete an item from a drive.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `itemRef` | [`DriveItemRef`](DriveItem-1.md#driveitemref) | Reference to the drive item to be deleted. |
| `options` | [`DeleteDriveItemOptions`](#deletedriveitemoptions) | Optional settings for the delete operation. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`void`\>

#### See

https://learn.microsoft.com/en-us/graph/api/driveitem-delete
