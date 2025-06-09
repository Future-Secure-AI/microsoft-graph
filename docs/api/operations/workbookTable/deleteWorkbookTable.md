[Microsoft Graph SDK](../../README.md) / operations/workbookTable/deleteWorkbookTable

## Functions

### deleteWorkbookTable()

> **deleteWorkbookTable**(`tableRef`): [`GraphOperation`](../../GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/workbookTable/deleteWorkbookTable.ts:15](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookTable/deleteWorkbookTable.ts#L15)

Delete a workbook table. All data in the table will be cleared.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tableRef` | [`WorkbookTableRef`](../../WorkbookTableRef.md#workbooktableref) | A reference to the table, optionally including session information. |

#### Returns

[`GraphOperation`](../../GraphOperation.md#graphoperation)\<`void`\>

#### See

https://learn.microsoft.com/en-us/graph/api/table-delete
