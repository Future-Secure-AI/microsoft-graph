[Microsoft Graph SDK](../modules.md) / services/temporaryFiles

## Functions

### generateTempFileName()

> **generateTempFileName**(`extension`): [`DriveItemPath`](../models/DriveItemPath.md#driveitempath)

Defined in: [src/services/temporaryFiles.ts:9](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/services/temporaryFiles.ts#L9)

Generates a temporary file name with the specified extension.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `extension` | `null` \| `string` | `"tmp"` | The file extension. Defaults to "tmp". |

#### Returns

[`DriveItemPath`](../models/DriveItemPath.md#driveitempath)

A temporary file name.
