[Microsoft Graph SDK](../../modules.md) / operations/workbookTable/deleteWorkbookTable

## Functions

### deleteWorkbookTable()

> **deleteWorkbookTable**(`tableRef`): [`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/workbookTable/deleteWorkbookTable.ts:15](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/operations/workbookTable/deleteWorkbookTable.ts#L15)

Delete a workbook table. All data in the table will be cleared.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tableRef` | [`WorkbookTableRef`](../../models/WorkbookTableRef.md#workbooktableref) | A reference to the table, optionally including session information. |

#### Returns

[`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`void`\>

#### See

https://learn.microsoft.com/en-us/graph/api/table-delete
