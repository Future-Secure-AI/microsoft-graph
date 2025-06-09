[Microsoft Graph SDK](README.md) / listWorkbookTableRows

# listWorkbookTableRows

Retrieve a list of rows in a table.

## Functions

### listWorkbookTableRows()

> **listWorkbookTableRows**(`tableRef`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookTableRow`[]\>

Defined in: [src/operations/workbookTable/listWorkbookTableRows.ts:19](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookTable/listWorkbookTableRows.ts#L19)

Retrieve a list of rows in a table.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tableRef` | [`WorkbookTableRef`](WorkbookTableRef.md#workbooktableref) | Reference to the table. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookTableRow`[]\>

Array of rows in the specified table.

#### See

https://learn.microsoft.com/en-us/graph/api/tablerow-list
