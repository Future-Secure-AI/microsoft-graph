[Microsoft Graph SDK](../modules.md) / tasks/downloadDriveItemContent

## Functions

### downloadDriveItemContent()

> **downloadDriveItemContent**(`itemRef`, `localFilePath`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: [src/tasks/downloadDriveItemContent.ts:12](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/tasks/downloadDriveItemContent.ts#L12)

Download a DriveItem and save it as a local file.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `itemRef` | [`DriveItemRef`](../models/DriveItemRef.md#driveitemref) | A reference to the DriveItem to download. |
| `localFilePath` | `string` | The local file path where the content should be saved. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Void when the content is successfully downloaded and saved.
