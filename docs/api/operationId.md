[Microsoft Graph SDK](README.md) / operationId

Utilities for converting between operation IDs and indexes.

## Functions

### operationIdToIndex()

> **operationIdToIndex**(`id`): `number`

Defined in: [src/services/operationId.ts:21](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/operationId.ts#L21)

Converts an operation ID to an operation index.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `string` | The operation ID as a string. |

#### Returns

`number`

The operation index as a number.

***

### operationIndexToId()

> **operationIndexToId**(`index`): `string`

Defined in: [src/services/operationId.ts:12](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/operationId.ts#L12)

Converts an operation index to an operation ID.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `index` | `number` | The operation index. |

#### Returns

`string`

The operation ID as a string.
