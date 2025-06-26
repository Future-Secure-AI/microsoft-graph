[Microsoft Graph SDK](README.md) / error

# error

Utilities for handling errors

## Functions

### isErrorWithName()

> **isErrorWithName**(`error`, `name`): `boolean`

Defined in: [src/services/error.ts:13](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/error.ts#L13)

Determines if the error has a specific name.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `error` | `unknown` | Error to check. |
| `name` | `string` | Name to compare against. |

#### Returns

`boolean`

True if the error has the specified name, false otherwise.
