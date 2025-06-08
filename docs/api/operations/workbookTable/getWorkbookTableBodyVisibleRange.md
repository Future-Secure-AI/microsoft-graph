[Microsoft Graph SDK](../../modules.md) / operations/workbookTable/getWorkbookTableBodyVisibleRange

## Functions

### getWorkbookTableBodyVisibleRange()

> **getWorkbookTableBodyVisibleRange**(`tableRef`): [`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`WorkbookRange`\>

Defined in: [src/operations/workbookTable/getWorkbookTableBodyVisibleRange.ts:14](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/operations/workbookTable/getWorkbookTableBodyVisibleRange.ts#L14)

Retrieve the visible data body range of a table.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tableRef` | [`WorkbookTableRef`](../../models/WorkbookTableRef.md#workbooktableref) | A reference to the table, optionally including session information. |

#### Returns

[`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`WorkbookRange`\>

The data body range of the specified table, including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/table-databodyrange
