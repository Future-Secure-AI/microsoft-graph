[Microsoft Graph SDK](../modules.md) / tasks/tryDeleteDriveItem

## Functions

### tryDeleteDriveItem()

> **tryDeleteDriveItem**(`driveItemRef`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`boolean`\>

Defined in: [src/tasks/tryDeleteDriveItem.ts:10](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/tasks/tryDeleteDriveItem.ts#L10)

Attempts to delete a DriveItem, returning a boolean indicating success or failure.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `driveItemRef` | [`DriveItemRef`](../models/DriveItemRef.md#driveitemref) | A reference to the DriveItem to delete. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`boolean`\>

A boolean indicating whether the DriveItem was successfully deleted.
