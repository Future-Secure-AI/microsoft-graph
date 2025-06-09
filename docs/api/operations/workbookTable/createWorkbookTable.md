[Microsoft Graph SDK](../../README.md) / operations/workbookTable/createWorkbookTable

## Functions

### createWorkbookTable()

> **createWorkbookTable**(`rangeRef`, `hasHeaders`): [`GraphOperation`](../../GraphOperation.md#graphoperation)\<`WorkbookTable` & [`SiteRef`](../../SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Defined in: [src/operations/workbookTable/createWorkbookTable.ts:18](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookTable/createWorkbookTable.ts#L18)

Create a new table in a worksheet.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](../../WorkbookRangeRef.md#workbookrangeref) | A reference to the range where the table will be created, optionally including session information. |
| `hasHeaders` | `boolean` | A boolean indicating whether the table has headers. |

#### Returns

[`GraphOperation`](../../GraphOperation.md#graphoperation)\<`WorkbookTable` & [`SiteRef`](../../SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

The newly created table, including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/worksheet-post-tables
