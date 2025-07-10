[Microsoft Graph SDK](README.md) / createDriveItemContent

# createDriveItemContent

Creates a new drive item in the specified parent drive or folder using a stream as content.

## Interfaces

### CreateDriveItemContentOptions

Defined in: [src/operations/driveItem/createDriveItemContent.ts:43](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/driveItem/createDriveItemContent.ts#L43)

Options for creating a drive item with content upload.

#### Properties

##### conflictBehavior?

> `optional` **conflictBehavior**: `"replace"` \| `"fail"` \| `"rename"`

Defined in: [src/operations/driveItem/createDriveItemContent.ts:44](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/driveItem/createDriveItemContent.ts#L44)

Optional. Specifies how to handle conflicts if the file already exists. Can be 'fail', 'replace', or 'rename'.

##### maxChunkSize?

> `optional` **maxChunkSize**: `number`

Defined in: [src/operations/driveItem/createDriveItemContent.ts:45](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/driveItem/createDriveItemContent.ts#L45)

##### progress()?

> `optional` **progress**: (`bytes`) => `void`

Defined in: [src/operations/driveItem/createDriveItemContent.ts:46](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/driveItem/createDriveItemContent.ts#L46)

Optional. Callback function called with the number of bytes uploaded after each chunk.

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `bytes` | `number` |

###### Returns

`void`

## Variables

### chunkSizeMultiple

> `const` **chunkSizeMultiple**: `number`

Defined in: [src/operations/driveItem/createDriveItemContent.ts:23](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/driveItem/createDriveItemContent.ts#L23)

The required chunk size multiple for upload sessions.

#### Remarks

Microsoft Graph requires that each upload chunk is a multiple of 320 KiB (327,680 bytes).

#### See

https://learn.microsoft.com/en-us/graph/api/driveitem-createuploadsession

## Functions

### createDriveItemContent()

> **createDriveItemContent**(`parentRef`, `itemPath`, `contentStream`, `contentLength`, `options`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`DriveItem` & [`SiteRef`](Site-1.md#siteref) & `object` & `object`\>

Defined in: [src/operations/driveItem/createDriveItemContent.ts:63](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/driveItem/createDriveItemContent.ts#L63)

Creates a new drive item in the specified parent drive or folder using a stream as content.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `parentRef` | [`DriveRef`](Drive-1.md#driveref) \| [`DriveItemRef`](DriveItem-1.md#driveitemref) | Reference to the parent drive or folder where the drive item will be created. |
| `itemPath` | [`DriveItemPath`](DriveItem-1.md#driveitempath) | Path (including the filename) for the new drive item within the given parent. |
| `contentStream` | [`ReadableStream`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/node/globals.d.ts#L202) | A Node.js readable stream containing the file content. |
| `contentLength` | `number` | The total size in bytes of the content to be uploaded. |
| `options` | [`CreateDriveItemContentOptions`](#createdriveitemcontentoptions) | Optional. Additional options for the upload operation. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`DriveItem` & [`SiteRef`](Site-1.md#siteref) & `object` & `object`\>

The newly created drive item.

#### See

 - https://learn.microsoft.com/en-us/graph/api/driveitem-createuploadsession
 - https://learn.microsoft.com/en-us/graph/api/resources/uploadsession
