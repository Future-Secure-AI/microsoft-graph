[Microsoft Graph SDK](../README.md) / tasks/tryDeleteDriveItem

## Functions

### tryDeleteDriveItem()

> **tryDeleteDriveItem**(`driveItemRef`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`boolean`\>

Defined in: [src/tasks/tryDeleteDriveItem.ts:10](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/tryDeleteDriveItem.ts#L10)

Attempts to delete a DriveItem, returning a boolean indicating success or failure.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `driveItemRef` | [`DriveItemRef`](../DriveItemRef.md#driveitemref) | A reference to the DriveItem to delete. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`boolean`\>

A boolean indicating whether the DriveItem was successfully deleted.
