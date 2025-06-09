[Microsoft Graph SDK](../../README.md) / operations/workbookTable/deleteWorkbookTablePreservingValues

## Functions

### deleteWorkbookTablePreservingValues()

> **deleteWorkbookTablePreservingValues**(`tableRef`): [`GraphOperation`](../../GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/workbookTable/deleteWorkbookTablePreservingValues.ts:12](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookTable/deleteWorkbookTablePreservingValues.ts#L12)

Converts the table into a normal range of cells. All data is preserved.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tableRef` | [`WorkbookTableRef`](../../WorkbookTableRef.md#workbooktableref) | A reference to the table, optionally including session information. |

#### Returns

[`GraphOperation`](../../GraphOperation.md#graphoperation)\<`void`\>

#### See

https://learn.microsoft.com/en-us/graph/api/table-converttorange
