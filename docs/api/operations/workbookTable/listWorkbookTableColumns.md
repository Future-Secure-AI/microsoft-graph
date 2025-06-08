[Microsoft Graph SDK](../../modules.md) / operations/workbookTable/listWorkbookTableColumns

## Functions

### listWorkbookTableColumns()

> **listWorkbookTableColumns**(`tableRef`): [`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`WorkbookTableColumn`[]\>

Defined in: [src/operations/workbookTable/listWorkbookTableColumns.ts:14](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/operations/workbookTable/listWorkbookTableColumns.ts#L14)

Retrieve a list of columns in a table.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tableRef` | [`WorkbookTableRef`](../../models/WorkbookTableRef.md#workbooktableref) | A reference to the table, optionally including session information. |

#### Returns

[`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`WorkbookTableColumn`[]\>

An array of columns in the specified table.

#### See

https://learn.microsoft.com/en-us/graph/api/tablecolumn-list
