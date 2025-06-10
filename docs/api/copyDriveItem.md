[Microsoft Graph SDK](README.md) / copyDriveItem

# copyDriveItem

Copy a drive item.

## Functions

### copyDriveItem()

> **copyDriveItem**(`srcFileRef`, `dstDriveRef`, `dstFilePath`, `timeoutMs`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`DriveItem` & [`SiteRef`](Site-1.md#siteref) & `object` & `object`\>

Defined in: [src/tasks/copyDriveItem.ts:26](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/copyDriveItem.ts#L26)

Copy a drive item.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `srcFileRef` | [`DriveItemRef`](DriveItem-1.md#driveitemref) | `undefined` | A reference to the source file to be copied. |
| `dstDriveRef` | [`DriveRef`](Drive-1.md#driveref) | `undefined` | Destination drive |
| `dstFilePath` | [`DriveItemPath`](DriveItem-1.md#driveitempath) | `undefined` | Destination path where the item should be copied to. |
| `timeoutMs` | `number` | `16000` | Timeout in milliseconds for the copy operation. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`DriveItem` & [`SiteRef`](Site-1.md#siteref) & `object` & `object`\>

Reference to the new drive item.

#### Remarks

The underlying GraphAPI operation is asynchronous, so this function will block until the copy operation is complete or the timeout is reached.

#### Throws

[RequestTimeoutError](RequestTimeoutError.md) If the copy operation does not complete within the specified timeout.
