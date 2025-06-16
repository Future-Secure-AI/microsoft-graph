[Microsoft Graph SDK](README.md) / updateFirstRow

# updateFirstRow

**`Experimental`**

Update first row in a given workbook range.

## Functions

### updateWorkbookRangeFirstRow()

> **updateWorkbookRangeFirstRow**(`originRef`, `cells`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: [src/tasks/updateWorkbookRangeFirstRow.ts:28](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/updateWorkbookRangeFirstRow.ts#L28)

**`Experimental`**

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `originRef` | [`WorkbookRangeRef`](WorkbookRange-1.md#workbookrangeref) | Reference to the workbook range to update. Only the upper-left cell is used as an origin point. |
| `cells` | [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`Cell`](Cell.md#cell)\>[] | Array of arrays of cells to update in the specified range. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

#### Remarks

`undefined` values are left unchanged. Applying styling to cells is slow, use sparingly.

#### Example

```ts
// Basic example:
await updateFirstRow(rangeRef, [{ value: 1 }, { value: 2 }]);

// Advanced example with cell formatting:
await updateRows(rangeRef, [
 { value: "Column A", style: { alignment: { horizontal: "Right" }, font: { bold: true } } },
 { value: "Column B", style: { alignment: { horizontal: "Right" }, font: { bold: true } } }
]);
```
