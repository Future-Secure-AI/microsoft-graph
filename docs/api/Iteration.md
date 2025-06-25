[Microsoft Graph SDK](README.md) / Iteration

# Iteration

Utilities for iterating over AsyncIterables.

## Functions

### iterateToArray()

> **iterateToArray**\<`T`, `U`\>(`iterable`, `converter?`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`U`[]\>

Defined in: [src/services/iteration.ts:12](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/iteration.ts#L12)

Iterate over an AsyncIterable and collect all items into an array.

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | - |
| `U` | `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `iterable` | `AsyncIterable`\<`T`\> |  |
| `converter?` | (`item`) => `U` | - |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`U`[]\>

Array of items collected from the iterable.
