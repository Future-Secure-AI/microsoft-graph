[Microsoft Graph SDK](README.md) / tryDeleteDriveItem

Attempts to delete a drive item, returning success status.

## Functions

### tryDeleteDriveItem()

> **tryDeleteDriveItem**(`driveItemRef`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`boolean`\>

Defined in: [src/tasks/tryDeleteDriveItem.ts:15](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/tryDeleteDriveItem.ts#L15)

Attempts to delete a drive item, returning success status.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `driveItemRef` | [`DriveItemRef`](DriveItemRef.md#driveitemref) | A reference to the DriveItem to delete. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`boolean`\>

Boolean indicating whether the DriveItem was successfully deleted.

#### Remarks

No error is thrown.
