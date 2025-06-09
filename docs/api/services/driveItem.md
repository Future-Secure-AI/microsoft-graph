[Microsoft Graph SDK](../README.md) / services/driveItem

## Variables

### rootDriveItemPath

> `const` **rootDriveItemPath**: [`DriveItemPath`](../DriveItemPath.md#driveitempath)

Defined in: [src/services/driveItem.ts:14](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/driveItem.ts#L14)

***

### workbookFileExtension

> `const` **workbookFileExtension**: `"xlsx"` = `"xlsx"`

Defined in: [src/services/driveItem.ts:12](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/driveItem.ts#L12)

## Functions

### createDriveItemRef()

> **createDriveItemRef**(`driveRef`, `itemId`): [`DriveItemRef`](../DriveItemRef.md#driveitemref)

Defined in: [src/services/driveItem.ts:65](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/driveItem.ts#L65)

Creates a reference to a drive item.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `driveRef` | [`DriveRef`](../DriveRef.md#driveref) | The reference to the drive. |
| `itemId` | `undefined` \| [`DriveItemId`](../DriveItemId.md#driveitemid) | The ID of the drive item. |

#### Returns

[`DriveItemRef`](../DriveItemRef.md#driveitemref)

A reference to the drive item.

#### Throws

ProtocolError if the item ID is missing.

***

### driveItemPath()

> **driveItemPath**(...`segments`): [`DriveItemPath`](../DriveItemPath.md#driveitempath)

Defined in: [src/services/driveItem.ts:22](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/driveItem.ts#L22)

Creates a drive item path from a given set of segments.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`segments` | `string`[] | The segments of the path. |

#### Returns

[`DriveItemPath`](../DriveItemPath.md#driveitempath)

The constructed drive item path.

#### Throws

InvalidArgumentError if a segment is invalid or the path exceeds 400 characters.

***

### splitDriveItemPath()

> **splitDriveItemPath**(`filePath`): `object`

Defined in: [src/services/driveItem.ts:83](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/driveItem.ts#L83)

Splits a drive item path into its folder path and file name.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `filePath` | [`DriveItemPath`](../DriveItemPath.md#driveitempath) | The full path of the file. |

#### Returns

`object`

An object containing the folder path and file name.

##### fileName

> **fileName**: `string`

##### folderPath

> **folderPath**: [`DriveItemPath`](../DriveItemPath.md#driveitempath)
