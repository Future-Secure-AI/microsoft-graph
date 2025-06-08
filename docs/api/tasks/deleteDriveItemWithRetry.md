[Microsoft Graph SDK](../modules.md) / tasks/deleteDriveItemWithRetry

## Functions

### deleteDriveItemWithRetry()

> **deleteDriveItemWithRetry**(`driveItemRef`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: [src/tasks/deleteDriveItemWithRetry.ts:11](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/tasks/deleteDriveItemWithRetry.ts#L11)

Delete a DriveItem, avoiding locking issues through automatic retries.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `driveItemRef` | [`DriveItemRef`](../models/DriveItemRef.md#driveitemref) | A reference to the DriveItem to delete. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Void when the DriveItem is successfully deleted.
