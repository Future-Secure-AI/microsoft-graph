[Microsoft Graph SDK](../../modules.md) / operations/workbookTable/deleteWorkbookTablePreservingValues

## Functions

### deleteWorkbookTablePreservingValues()

> **deleteWorkbookTablePreservingValues**(`tableRef`): [`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/workbookTable/deleteWorkbookTablePreservingValues.ts:12](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/operations/workbookTable/deleteWorkbookTablePreservingValues.ts#L12)

Converts the table into a normal range of cells. All data is preserved.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tableRef` | [`WorkbookTableRef`](../../models/WorkbookTableRef.md#workbooktableref) | A reference to the table, optionally including session information. |

#### Returns

[`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`void`\>

#### See

https://learn.microsoft.com/en-us/graph/api/table-converttorange
