[Microsoft Graph SDK](README.md) / getWorkbookTableBodyRange

# getWorkbookTableBodyRange

Retrieve the data body range of a workbook table.

## Functions

### getWorkbookTableBodyRange()

> **getWorkbookTableBodyRange**(`tableRef`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookRange` & [`SiteRef`](Site-1.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Defined in: [src/operations/workbookTable/getWorkbookTableBodyRange.ts:23](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookTable/getWorkbookTableBodyRange.ts#L23)

Retrieve the data body range of a workbook table.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tableRef` | [`WorkbookTableRef`](WorkbookTable-1.md#workbooktableref) | Reference to the table. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookRange` & [`SiteRef`](Site-1.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Data body range of the specified table.

#### See

https://learn.microsoft.com/en-us/graph/api/table-databodyrange
