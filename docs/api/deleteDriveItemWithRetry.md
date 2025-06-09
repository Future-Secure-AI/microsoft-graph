[Microsoft Graph SDK](README.md) / deleteDriveItemWithRetry

# deleteDriveItemWithRetry

Delete a drive item, avoiding locking issues through automatic retries.

## Functions

### deleteDriveItemWithRetry()

> **deleteDriveItemWithRetry**(`driveItemRef`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: [src/tasks/deleteDriveItemWithRetry.ts:18](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/deleteDriveItemWithRetry.ts#L18)

Delete a drive item, avoiding locking issues through automatic retries.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `driveItemRef` | [`DriveItemRef`](DriveItemRef.md#driveitemref) | Reference to the DriveItem to delete. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Nothing

#### Remarks

This function attempts to delete the drive item up to three times with increasing delays (1s, 2s, 4s) in case of failure.
