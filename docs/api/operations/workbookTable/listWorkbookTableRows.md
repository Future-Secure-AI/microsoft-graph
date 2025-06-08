[Microsoft Graph SDK](../../README.md) / operations/workbookTable/listWorkbookTableRows

## Functions

### listWorkbookTableRows()

> **listWorkbookTableRows**(`tableRef`): [`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`WorkbookTableRow`[]\>

Defined in: [src/operations/workbookTable/listWorkbookTableRows.ts:14](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookTable/listWorkbookTableRows.ts#L14)

Retrieve a list of rows in a table.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tableRef` | [`WorkbookTableRef`](../../models/WorkbookTableRef.md#workbooktableref) | A reference to the table, optionally including session information. |

#### Returns

[`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`WorkbookTableRow`[]\>

An array of rows in the specified table.

#### See

https://learn.microsoft.com/en-us/graph/api/tablerow-list
