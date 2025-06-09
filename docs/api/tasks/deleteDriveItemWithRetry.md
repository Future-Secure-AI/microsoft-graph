[Microsoft Graph SDK](../README.md) / tasks/deleteDriveItemWithRetry

## Functions

### deleteDriveItemWithRetry()

> **deleteDriveItemWithRetry**(`driveItemRef`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: [src/tasks/deleteDriveItemWithRetry.ts:11](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/deleteDriveItemWithRetry.ts#L11)

Delete a DriveItem, avoiding locking issues through automatic retries.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `driveItemRef` | [`DriveItemRef`](../DriveItemRef.md#driveitemref) | A reference to the DriveItem to delete. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Void when the DriveItem is successfully deleted.
