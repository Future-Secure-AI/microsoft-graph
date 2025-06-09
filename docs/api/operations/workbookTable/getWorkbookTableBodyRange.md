[Microsoft Graph SDK](../../README.md) / operations/workbookTable/getWorkbookTableBodyRange

## Functions

### getWorkbookTableBodyRange()

> **getWorkbookTableBodyRange**(`tableRef`): [`GraphOperation`](../../GraphOperation.md#graphoperation)\<`WorkbookRange` & [`SiteRef`](../../SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Defined in: [src/operations/workbookTable/getWorkbookTableBodyRange.ts:18](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookTable/getWorkbookTableBodyRange.ts#L18)

Retrieve the data body range of a table.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tableRef` | [`WorkbookTableRef`](../../WorkbookTableRef.md#workbooktableref) | A reference to the table, optionally including session information. |

#### Returns

[`GraphOperation`](../../GraphOperation.md#graphoperation)\<`WorkbookRange` & [`SiteRef`](../../SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

The data body range of the specified table, including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/table-databodyrange
