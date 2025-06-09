[Microsoft Graph SDK](README.md) / existsDriveItem

# existsDriveItem

Check if a given drive item exists.

## Functions

### existsDriveItem()

> **existsDriveItem**(`driveRef`, `itemPath`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`boolean`\>

Defined in: [src/operations/driveItem/existsDriveItem.ts:19](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/driveItem/existsDriveItem.ts#L19)

Check if a given drive item exists.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `driveRef` | [`DriveRef`](DriveRef.md#driveref) | Reference to the drive item to be downloaded. |
| `itemPath` | [`DriveItemPath`](DriveItemPath.md#driveitempath) | - |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`boolean`\>

If the drive item exists.
