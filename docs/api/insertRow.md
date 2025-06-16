[Microsoft Graph SDK](README.md) / insertRow

# insertRow

**`Experimental`**

Inserts a single row into a workbook range.

## Functions

### insertWorkbookRangeRow()

> **insertWorkbookRangeRow**(`originRef`, `row`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: [src/tasks/insertWorkbookRangeRow.ts:20](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/insertWorkbookRangeRow.ts#L20)

**`Experimental`**

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `originRef` | [`WorkbookRangeRef`](WorkbookRange-1.md#workbookrangeref) | Reference to the workbook range to update. Only the upper-left cell is used as an origin point. |
| `row` | [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`Cell`](Cell.md#cell)\>[] | Array of cells to insert as a single row. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

#### Example

```ts
await insertRow(originRef, [{ value: "A1" }, { value: "B1" }, { value: "C1" }]);
```
