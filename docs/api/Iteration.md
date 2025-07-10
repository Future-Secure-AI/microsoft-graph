[Microsoft Graph SDK](README.md) / Iteration

# Iteration

Utilities for iterating over AsyncIterables.
Collects all items from an Iterable or AsyncIterable into an array, optionally converting each item.

## Template

The type of items in the input iterable.

## Template

The type of items in the resulting array (after conversion).

## Param

The iterable or async iterable to collect items from.

## Functions

### iterateToArray()

> **iterateToArray**\<`TIn`, `TOut`\>(`iterable`, `converter?`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`TOut`[]\>

Defined in: [src/services/iteration.ts:11](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/iteration.ts#L11)

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `TIn` | - |
| `TOut` | `TIn` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `iterable` | [`Iterable`](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html#iterable-interface)\<`TIn`, `any`, `any`\> \| `AsyncIterable`\<`TIn`, `any`, `any`\> |
| `converter?` | (`item`) => `TOut` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`TOut`[]\>
