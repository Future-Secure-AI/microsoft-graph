[Microsoft Graph SDK](../../README.md) / operations/driveItem/existsDriveItem

## Functions

### existsDriveItem()

> **existsDriveItem**(`driveRef`, `itemPath`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`boolean`\>

Defined in: [src/operations/driveItem/existsDriveItem.ts:14](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/driveItem/existsDriveItem.ts#L14)

Check if a given drive item exists.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `driveRef` | [`DriveRef`](../../DriveRef.md#driveref) | A reference to the drive item to be downloaded. |
| `itemPath` | [`DriveItemPath`](../../DriveItemPath.md#driveitempath) | - |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`boolean`\>

If the drive item exists.
