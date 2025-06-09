[Microsoft Graph SDK](../README.md) / services/temporaryFiles

## Functions

### generateTempFileName()

> **generateTempFileName**(`extension`): [`DriveItemPath`](../DriveItemPath.md#driveitempath)

Defined in: [src/services/temporaryFiles.ts:9](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/temporaryFiles.ts#L9)

Generates a temporary file name with the specified extension.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `extension` | `null` \| `string` | `"tmp"` | The file extension. Defaults to "tmp". |

#### Returns

[`DriveItemPath`](../DriveItemPath.md#driveitempath)

A temporary file name.
