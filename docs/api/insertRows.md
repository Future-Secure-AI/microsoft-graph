[Microsoft Graph SDK](README.md) / insertRows

# insertRows

**`Experimental`**

Inserts rows into a workbook range.

## Functions

### insertRows()

> **insertRows**(`originRef`, `cells`, `maxCellsPerOperation`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: [src/tasks/insertRows.ts:38](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/insertRows.ts#L38)

**`Experimental`**

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `originRef` | [`WorkbookRangeRef`](WorkbookRange-1.md#workbookrangeref) | `undefined` | Reference to the workbook range to update. Only the upper-left cell is used as an origin point. |
| `cells` | [`Iterable`](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html#iterable-interface)\<[`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`Cell`](Cell.md#cell)\>[], `any`, `any`\> \| `AsyncIterable`\<[`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`Cell`](Cell.md#cell)\>[], `any`, `any`\> | `undefined` | Array of arrays of cells to update in the specified range. |
| `maxCellsPerOperation` | `null` \| `number` | `null` | Prescribe max cells to retrieve per operation. `null` automatically determines value. DO NOT SET EXCEPT FOR ADVANCED TUNING. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

#### Example

```ts
// Basic example:
await insertRows(originRef, [
  [{ value: "A1" }, { value: "B1" }, { value: "C1" }],
  [{ value: "A2" }, { value: "B2" }, { value: "C2" }],
 [{ value: "A3" }, { value: "B3" }, { value: "C3" }],
])

// Advanced example with cell formatting:
await insertRows(originRef, [
  [{ value: "A1", format: { fontColor: "red" } }, { value: "B1" }, { value: "C1" }],
  [{ value: "A2" }, { value: "B2", format: { fontColor: "blue" } }, { value: "C2" }],
  [{ value: "A3" }, { value: "B3" }, { value: "C3", format: { fontColor: "green" } }],
]);
```
