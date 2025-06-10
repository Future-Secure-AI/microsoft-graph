[Microsoft Graph SDK](README.md) / setWorkbookTableBodyVisibleRows

# setWorkbookTableBodyVisibleRows

Set visible rows of a workbook table with the provided 2D array of values, ignoring hidden rows and inserting new rows at the end if needed.

## Functions

### setWorkbookTableBodyVisibleRows()

> **setWorkbookTableBodyVisibleRows**(`tableRef`, `values`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: [src/tasks/setWorkbookTableBodyVisibleRows.ts:25](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/setWorkbookTableBodyVisibleRows.ts#L25)

Set visible rows of a workbook table with the provided 2D array of values, ignoring hidden rows and inserting new rows at the end if needed.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tableRef` | [`WorkbookTableRef`](WorkbookTable-1.md#workbooktableref) | Reference to the workbook table. |
| `values` | `string`[][] | 2D array of strings representing the values to set in the visible rows of the table. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

#### Throws

[InvalidArgumentError](InvalidArgumentError.md) If the number of columns in any row of `values` does not match the table's column count.
 *

#### Remarks

THIS FUNCTION IS SLOW, as it must check each row's visibility.
