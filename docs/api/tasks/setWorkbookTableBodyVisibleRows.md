[Microsoft Graph SDK](../README.md) / tasks/setWorkbookTableBodyVisibleRows

## Functions

### setWorkbookTableBodyVisibleRows()

> **setWorkbookTableBodyVisibleRows**(`tableRef`, `values`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: [src/tasks/setWorkbookTableBodyVisibleRows.ts:20](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/setWorkbookTableBodyVisibleRows.ts#L20)

Overwrite visible rows of a workbook table with the provided 2D array of values, inserting new rows at the end if needed.
THIS IS SLOW as it must check each row's visibility.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tableRef` | [`WorkbookTableRef`](../WorkbookTableRef.md#workbooktableref) | A reference to the workbook table. |
| `values` | `string`[][] | A 2D array of strings representing the values to set in the visible rows of the table. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Void when the operation is complete.

#### Throws

If the number of columns in any row of `values` does not match the table's column count.
