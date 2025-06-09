[Microsoft Graph SDK](README.md) / listWorkbookTableColumns

# listWorkbookTableColumns

Retrieve a list of columns in a table.

## Functions

### listWorkbookTableColumns()

> **listWorkbookTableColumns**(`tableRef`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookTableColumn`[]\>

Defined in: [src/operations/workbookTable/listWorkbookTableColumns.ts:19](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookTable/listWorkbookTableColumns.ts#L19)

Retrieve a list of columns in a table.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tableRef` | [`WorkbookTableRef`](WorkbookTableRef.md#workbooktableref) | Reference to the table. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookTableColumn`[]\>

Array of columns in the specified table.

#### See

https://learn.microsoft.com/en-us/graph/api/tablecolumn-list
