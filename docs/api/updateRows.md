[Microsoft Graph SDK](README.md) / updateRows

# updateRows

**`Experimental`**

Update rows in a given workbook range.

## Functions

### updateRows()

> **updateRows**(`originRef`, `cells`, `maxCellsPerOperation`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: [src/tasks/updateRows.ts:47](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/updateRows.ts#L47)

**`Experimental`**

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `originRef` | [`WorkbookRangeRef`](WorkbookRange-1.md#workbookrangeref) | `undefined` | Reference to the workbook range to update. Only the upper-left cell is used as an origin point. |
| `cells` | [`Iterable`](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html#iterable-interface)\<[`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`Cell`](Cell.md#cell)\>[], `any`, `any`\> \| `AsyncIterable`\<[`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`Cell`](Cell.md#cell)\>[], `any`, `any`\> | `undefined` | Array of arrays of cells to update in the specified range. |
| `maxCellsPerOperation` | `null` \| `number` | `null` | Prescribe max cells to retrieve per operation. `null` automatically determines value. DO NOT SET EXCEPT FOR ADVANCED TUNING. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

#### Remarks

`undefined` values are left unchanged. Applying styling to cells is slow, use sparingly.

#### Example

```ts
// Basic example:
await updateRows(rangeRef, [
  [{ value: 1 }, { value: 2 }],
  [{ value: 3 }, { value: 4 }],
  [{ value: 5 }, { value: 6 }],
]);

// Advanced example with cell formatting:
await updateRows(rangeRef, [
  [{ value: "Column A", style: { alignment: { horizontal: "Right" }, font: { bold: true } } }, { value: "Column B", style: { alignment: { horizontal: "Right" }, font: { bold: true } }  }],
  [{ value: 1, format: accountingCellFormat }, { value: "A" }],
  [{ value: 2, format: accountingCellFormat }, { value: "B" }],
]);
```
