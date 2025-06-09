[Microsoft Graph SDK](README.md) / driveItem

Utilities for working with Microsoft Graph Drive Items (files and folders).

## Variables

### rootDriveItemPath

> `const` **rootDriveItemPath**: [`DriveItemPath`](DriveItemPath.md#driveitempath)

Defined in: [src/services/driveItem.ts:20](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/driveItem.ts#L20)

***

### workbookFileExtension

> `const` **workbookFileExtension**: `"xlsx"` = `"xlsx"`

Defined in: [src/services/driveItem.ts:18](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/driveItem.ts#L18)

## Functions

### createDriveItemRef()

> **createDriveItemRef**(`driveRef`, `itemId`): [`DriveItemRef`](DriveItemRef.md#driveitemref)

Defined in: [src/services/driveItem.ts:71](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/driveItem.ts#L71)

Creates a reference to a drive item.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `driveRef` | [`DriveRef`](DriveRef.md#driveref) | The reference to the drive. |
| `itemId` | `undefined` \| [`DriveItemId`](DriveItemId.md#driveitemid) | The ID of the drive item. |

#### Returns

[`DriveItemRef`](DriveItemRef.md#driveitemref)

A reference to the drive item.

#### Throws

ProtocolError if the item ID is missing.

***

### driveItemPath()

> **driveItemPath**(...`segments`): [`DriveItemPath`](DriveItemPath.md#driveitempath)

Defined in: [src/services/driveItem.ts:28](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/driveItem.ts#L28)

Creates a drive item path from a given set of segments.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`segments` | `string`[] | The segments of the path. |

#### Returns

[`DriveItemPath`](DriveItemPath.md#driveitempath)

The constructed drive item path.

#### Throws

InvalidArgumentError if a segment is invalid or the path exceeds 400 characters.

***

### splitDriveItemPath()

> **splitDriveItemPath**(`filePath`): `object`

Defined in: [src/services/driveItem.ts:89](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/driveItem.ts#L89)

Splits a drive item path into its folder path and file name.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `filePath` | [`DriveItemPath`](DriveItemPath.md#driveitempath) | The full path of the file. |

#### Returns

`object`

An object containing the folder path and file name.

##### fileName

> **fileName**: `string`

##### folderPath

> **folderPath**: [`DriveItemPath`](DriveItemPath.md#driveitempath)
