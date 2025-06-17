[Microsoft Graph SDK](README.md) / streamDriveItemContent

# streamDriveItemContent

Stream the content of a drive item as a Node.js readable stream.

## Functions

### streamDriveItemContent()

> **streamDriveItemContent**(`itemRef`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`ReadableStream`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/4771e16937e188c0e0eca9749d208676f85fefb9/types/node/globals.d.ts#L201)\>

Defined in: [src/operations/driveItem/streamDriveItemContent.ts:21](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/driveItem/streamDriveItemContent.ts#L21)

Stream the content of a drive item.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `itemRef` | [`DriveItemRef`](DriveItem-1.md#driveitemref) | Reference to the drive item to be streamed. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`ReadableStream`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/4771e16937e188c0e0eca9749d208676f85fefb9/types/node/globals.d.ts#L201)\>

A Node.js readable stream of the drive item content.

#### Throws

Error if the download fails or the response is not a stream.

#### See

https://learn.microsoft.com/en-us/graph/api/driveitem-get-content
