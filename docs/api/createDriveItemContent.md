[Microsoft Graph SDK](README.md) / createDriveItemContent

# createDriveItemContent

Creates a new drive item in the specified parent drive or folder using a stream as content.

## Functions

### createDriveItemContent()

> **createDriveItemContent**(`parentRef`, `itemPath`, `contentStream`, `totalSize`, `conflictBehavior`, `chunkSize`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`DriveItem` & [`SiteRef`](Site-1.md#siteref) & `object` & `object`\>

Defined in: [src/operations/driveItem/createDriveItemContent.ts:39](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/driveItem/createDriveItemContent.ts#L39)

Creates a new drive item in the specified parent drive or folder using a stream as content.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `parentRef` | [`DriveRef`](Drive-1.md#driveref) \| [`DriveItemRef`](DriveItem-1.md#driveitemref) | `undefined` | Reference to the parent drive or folder where the drive item will be created. |
| `itemPath` | [`DriveItemPath`](DriveItem-1.md#driveitempath) | `undefined` | Path (including the filename) for the new drive item within the given parent. |
| `contentStream` | [`ReadableStream`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/node/globals.d.ts#L202) | `undefined` | A Node.js readable stream containing the file content. |
| `totalSize` | `number` | `undefined` | The total size in bytes of the content to be uploaded. |
| `conflictBehavior` | `"replace"` \| `"fail"` \| `"rename"` | `"fail"` | Optional. Specifies how to handle conflicts if the file already exists. Default is 'fail'. |
| `chunkSize` | `number` | `defaultChunkSize` | - |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`DriveItem` & [`SiteRef`](Site-1.md#siteref) & `object` & `object`\>

The newly created drive item.

#### See

 - https://learn.microsoft.com/en-us/graph/api/driveitem-createuploadsession
 - https://learn.microsoft.com/en-us/graph/api/resources/uploadsession
