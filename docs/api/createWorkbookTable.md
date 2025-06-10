[Microsoft Graph SDK](README.md) / createWorkbookTable

# createWorkbookTable

Create a new table in a worksheet.

## Functions

### createWorkbookTable()

> **createWorkbookTable**(`rangeRef`, `hasHeaders`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookTable` & [`SiteRef`](Site-1.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Defined in: [src/operations/workbookTable/createWorkbookTable.ts:22](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookTable/createWorkbookTable.ts#L22)

Create a new table in a worksheet.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](WorkbookRange-1.md#workbookrangeref) | Reference to the range where the table will be created. |
| `hasHeaders` | `boolean` | If the table has headers. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookTable` & [`SiteRef`](Site-1.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

The newly created table.

#### See

https://learn.microsoft.com/en-us/graph/api/worksheet-post-tables
