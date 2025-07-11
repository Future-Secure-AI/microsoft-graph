[Microsoft Graph SDK](README.md) / downloadDriveItemContent

# downloadDriveItemContent

Download a drive item and save it to the local disk.

## Functions

### downloadDriveItemContent()

> **downloadDriveItemContent**(`itemRef`, `localFilePath`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: [src/tasks/downloadDriveItemContent.ts:17](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/downloadDriveItemContent.ts#L17)

Download a drive item and save it to the local disk.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `itemRef` | [`DriveItemRef`](DriveItem-1.md#driveitemref) | A reference to the DriveItem to download. |
| `localFilePath` | `string` | The local file path where the content should be saved. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>
