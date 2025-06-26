[Microsoft Graph SDK](README.md) / driveItem

# driveItem

Utilities for working with Microsoft Graph Drive Items (files and folders).

## Variables

### binaryWorkbookFileExtension

> `const` **binaryWorkbookFileExtension**: `"xlsb"` = `"xlsb"`

Defined in: [src/services/driveItem.ts:19](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/driveItem.ts#L19)

***

### rootDriveItemPath

> `const` **rootDriveItemPath**: [`DriveItemPath`](DriveItem-1.md#driveitempath)

Defined in: [src/services/driveItem.ts:21](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/driveItem.ts#L21)

***

### workbookFileExtension

> `const` **workbookFileExtension**: `"xlsx"` = `"xlsx"`

Defined in: [src/services/driveItem.ts:18](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/driveItem.ts#L18)

## Functions

### createDriveItemRef()

> **createDriveItemRef**(`driveRef`, `itemId`): [`DriveItemRef`](DriveItem-1.md#driveitemref)

Defined in: [src/services/driveItem.ts:72](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/driveItem.ts#L72)

Creates a reference to a drive item.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `driveRef` | [`DriveRef`](Drive-1.md#driveref) | The reference to the drive. |
| `itemId` | `undefined` \| [`DriveItemId`](DriveItem-1.md#driveitemid) | The ID of the drive item. |

#### Returns

[`DriveItemRef`](DriveItem-1.md#driveitemref)

A reference to the drive item.

#### Throws

ProtocolError if the item ID is missing.

***

### driveItemPath()

> **driveItemPath**(...`segments`): [`DriveItemPath`](DriveItem-1.md#driveitempath)

Defined in: [src/services/driveItem.ts:29](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/driveItem.ts#L29)

Creates a drive item path from a given set of segments.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`segments` | `string`[] | The segments of the path. |

#### Returns

[`DriveItemPath`](DriveItem-1.md#driveitempath)

The constructed drive item path.

#### Throws

InvalidArgumentError if a segment is invalid or the path exceeds 400 characters.

***

### getDriveItemExtension()

> **getDriveItemExtension**(`item`): `string`

Defined in: [src/services/driveItem.ts:110](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/driveItem.ts#L110)

Gets the file extension of a drive item.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `item` | `DriveItem` | Drive item. |

#### Returns

`string`

File extension ie. "txt", "jpg"

***

### splitDriveItemPath()

> **splitDriveItemPath**(`filePath`): `object`

Defined in: [src/services/driveItem.ts:90](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/driveItem.ts#L90)

Splits a drive item path into its folder path and file name.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `filePath` | [`DriveItemPath`](DriveItem-1.md#driveitempath) | The full path of the file. |

#### Returns

`object`

An object containing the folder path and file name.

##### fileName

> **fileName**: `string`

##### folderPath

> **folderPath**: [`DriveItemPath`](DriveItem-1.md#driveitempath)
