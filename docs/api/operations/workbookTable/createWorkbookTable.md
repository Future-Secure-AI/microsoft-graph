[Microsoft Graph SDK](../../modules.md) / operations/workbookTable/createWorkbookTable

## Functions

### createWorkbookTable()

> **createWorkbookTable**(`rangeRef`, `hasHeaders`): [`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`WorkbookTable` & [`SiteRef`](../../models/SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Defined in: [src/operations/workbookTable/createWorkbookTable.ts:18](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/operations/workbookTable/createWorkbookTable.ts#L18)

Create a new table in a worksheet.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](../../models/WorkbookRangeRef.md#workbookrangeref) | A reference to the range where the table will be created, optionally including session information. |
| `hasHeaders` | `boolean` | A boolean indicating whether the table has headers. |

#### Returns

[`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`WorkbookTable` & [`SiteRef`](../../models/SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

The newly created table, including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/worksheet-post-tables
