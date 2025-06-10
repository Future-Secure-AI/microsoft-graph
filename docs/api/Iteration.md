[Microsoft Graph SDK](README.md) / Iteration

# Iteration

## Functions

### iterateToArray()

> **iterateToArray**\<`T`\>(`iterable`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`T`[]\>

Defined in: [src/services/iteration.ts:11](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/iteration.ts#L11)

Iterate over an AsyncIterable and collect all items into an array.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `iterable` | `AsyncIterable`\<`T`\> |  |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`T`[]\>

Array of items collected from the iterable.
