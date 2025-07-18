[Microsoft Graph SDK](README.md) / temporaryFiles

# temporaryFiles

Utilities for generating temporary file names for use with Drive Items.

## Functions

### generateTempFileName()

> **generateTempFileName**(`extension`): [`DriveItemPath`](DriveItem-1.md#driveitempath)

Defined in: [src/services/temporaryFiles.ts:15](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/temporaryFiles.ts#L15)

Generates a temporary file name with the specified extension.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `extension` | `null` \| `string` | `"tmp"` | The file extension. Defaults to "tmp". |

#### Returns

[`DriveItemPath`](DriveItem-1.md#driveitempath)

A temporary file name.
