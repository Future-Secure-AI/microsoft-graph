[Microsoft Graph SDK](README.md) / tryDeleteDriveItem

# tryDeleteDriveItem

Attempts to delete a drive item, returning success status.

## Functions

### tryDeleteDriveItem()

> **tryDeleteDriveItem**(`driveItemRef`, `options?`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`boolean`\>

Defined in: [src/tasks/tryDeleteDriveItem.ts:17](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/tryDeleteDriveItem.ts#L17)

Attempts to delete a drive item, returning success status.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `driveItemRef` | [`DriveItemRef`](DriveItem-1.md#driveitemref) | A reference to the DriveItem to delete. |
| `options?` | [`DeleteDriveItemOptions`](deleteDriveItem.md#deletedriveitemoptions) | Optional options for deletion. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`boolean`\>

Boolean indicating whether the DriveItem was successfully deleted.

#### Remarks

No error is thrown.
