[Microsoft Graph SDK](README.md) / updateWorkbookRangeRows

# updateWorkbookRangeRows

**`Experimental`**

Update rows in a given workbook range.

## Functions

### updateWorkbookRangeRows()

> **updateWorkbookRangeRows**(`originRef`, `cells`, `maxCellsPerOperation`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: [src/tasks/updateWorkbookRangeRows.ts:54](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/updateWorkbookRangeRows.ts#L54)

**`Experimental`**

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `originRef` | [`WorkbookRangeRef`](WorkbookRange-1.md#workbookrangeref) | `undefined` | Reference to the workbook range to update. Only the upper-left cell is used as an origin point. |
| `cells` | `AsyncIterable`\<[`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`Cell`](Cell.md#cell)\>[], `any`, `any`\> \| [`Iterable`](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html#iterable-interface)\<[`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`Cell`](Cell.md#cell)\>[], `any`, `any`\> | `undefined` | Array of arrays of cells to update in the specified range. |
| `maxCellsPerOperation` | `null` \| `number` | `null` | Prescribe max cells to retrieve per operation. `null` automatically determines value. DO NOT SET EXCEPT FOR ADVANCED TUNING. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

#### Remarks

`undefined` values are left unchanged. Applying styling to cells is slow, use sparingly.

#### Example

```ts
// Basic example:
await updateWorkbookRangeRows(rangeRef, [
  [{ value: 1 }, { value: 2 }],
  [{ value: 3 }, { value: 4 }],
  [{ value: 5 }, { value: 6 }],
]);

// Advanced example with cell formatting:
await updateWorkbookRangeRows(rangeRef, [
[
	{ value: "Column A", alignment: { horizontal: "Right" }, font: { bold: true, color: "#ffffff" as Color }, fill: { color: "#000000" as Color } },
	{ value: "Column B", alignment: { horizontal: "Right" }, font: { bold: true, color: "#ffffff" as Color }, fill: { color: "#000000" as Color } },
],
[
	{ value: 1, format: accountingCellFormat },
	{ value: "A" },
],
[
	{ value: 2, format: accountingCellFormat },
	{ value: "B" }],
],
);
```
