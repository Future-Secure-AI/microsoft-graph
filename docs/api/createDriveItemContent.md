[Microsoft Graph SDK](README.md) / createDriveItemContent

# createDriveItemContent

Creates a new drive item in the specified parent drive or folder using a stream as content.

## Interfaces

### CreateDriveItemContentOptions

Defined in: [src/operations/driveItem/createDriveItemContent.ts:42](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/driveItem/createDriveItemContent.ts#L42)

Creates a new drive item in the specified parent drive or folder using a stream as content.

#### Param

Reference to the parent drive or folder where the drive item will be created.

#### Param

Path (including the filename) for the new drive item within the given parent.

#### Param

A Node.js readable stream containing the file content.

#### Param

The total size in bytes of the content to be uploaded.

#### Param

Optional. Additional options for the upload operation.

#### Param

Optional. Specifies how to handle conflicts if the file already exists. Default is 'fail'.

#### Param

Optional. The size of each chunk to be uploaded in bytes. Default is 10MB.

#### Param

Optional. A callback function that is called periodically with the upload progress as a percentage.

#### See

 - https://learn.microsoft.com/en-us/graph/api/driveitem-createuploadsession
 - https://learn.microsoft.com/en-us/graph/api/resources/uploadsession

#### Properties

##### chunkSize?

> `optional` **chunkSize**: `number`

Defined in: [src/operations/driveItem/createDriveItemContent.ts:44](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/driveItem/createDriveItemContent.ts#L44)

##### conflictBehavior?

> `optional` **conflictBehavior**: `"replace"` \| `"fail"` \| `"rename"`

Defined in: [src/operations/driveItem/createDriveItemContent.ts:43](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/driveItem/createDriveItemContent.ts#L43)

##### progress()?

> `optional` **progress**: (`pct`) => `void`

Defined in: [src/operations/driveItem/createDriveItemContent.ts:45](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/driveItem/createDriveItemContent.ts#L45)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `pct` | `number` |

###### Returns

`void`

## Functions

### createDriveItemContent()

> **createDriveItemContent**(`parentRef`, `itemPath`, `contentStream`, `totalSize`, `options`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`DriveItem` & [`SiteRef`](Site-1.md#siteref) & `object` & `object`\>

Defined in: [src/operations/driveItem/createDriveItemContent.ts:48](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/driveItem/createDriveItemContent.ts#L48)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `parentRef` | [`DriveRef`](Drive-1.md#driveref) \| [`DriveItemRef`](DriveItem-1.md#driveitemref) |
| `itemPath` | [`DriveItemPath`](DriveItem-1.md#driveitempath) |
| `contentStream` | [`ReadableStream`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/node/globals.d.ts#L202) |
| `totalSize` | `number` |
| `options` | [`CreateDriveItemContentOptions`](#createdriveitemcontentoptions) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`DriveItem` & [`SiteRef`](Site-1.md#siteref) & `object` & `object`\>
