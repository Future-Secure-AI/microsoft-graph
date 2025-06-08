[Microsoft Graph SDK](../../README.md) / operations/driveItem/getDriveItemContent

## Functions

### getDriveItemContent()

> **getDriveItemContent**(`itemRef`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)\>

Defined in: [src/operations/driveItem/getDriveItemContent.ts:15](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/driveItem/getDriveItemContent.ts#L15)

Download the content of a drive item.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `itemRef` | [`DriveItemRef`](../../models/DriveItemRef.md#driveitemref) | A reference to the drive item to be downloaded. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)\>

The content of the drive item as an ArrayBuffer.

#### Throws

Error if the download fails.

#### See

https://learn.microsoft.com/en-us/graph/api/driveitem-get-content
