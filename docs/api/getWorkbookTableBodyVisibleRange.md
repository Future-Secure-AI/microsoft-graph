[Microsoft Graph SDK](README.md) / getWorkbookTableBodyVisibleRange

# getWorkbookTableBodyVisibleRange

Retrieve the visible data body range of a table.

## Functions

### getWorkbookTableBodyVisibleRange()

> **getWorkbookTableBodyVisibleRange**(`tableRef`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookRange`\>

Defined in: [src/operations/workbookTable/getWorkbookTableBodyVisibleRange.ts:19](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookTable/getWorkbookTableBodyVisibleRange.ts#L19)

Retrieve the visible data body range of a table.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tableRef` | [`WorkbookTableRef`](WorkbookTableRef.md#workbooktableref) | Reference to the table. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookRange`\>

Data body range of the specified table.

#### See

https://learn.microsoft.com/en-us/graph/api/table-databodyrange
