[Microsoft Graph SDK](README.md) / createWorkbookTable

Create a new table in a worksheet.

## Functions

### createWorkbookTable()

> **createWorkbookTable**(`rangeRef`, `hasHeaders`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookTable` & [`SiteRef`](SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Defined in: [src/operations/workbookTable/createWorkbookTable.ts:23](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookTable/createWorkbookTable.ts#L23)

Create a new table in a worksheet.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](WorkbookRangeRef.md#workbookrangeref) | Reference to the range where the table will be created. |
| `hasHeaders` | `boolean` | If the table has headers. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookTable` & [`SiteRef`](SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

The newly created table.

#### See

https://learn.microsoft.com/en-us/graph/api/worksheet-post-tables
