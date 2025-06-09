[Microsoft Graph SDK](../../README.md) / operations/workbookTable/listWorkbookTables

## Functions

### listWorkbookTables()

> **listWorkbookTables**(`worksheetRef`): [`GraphOperation`](../../GraphOperation.md#graphoperation)\<`WorkbookTable` & [`SiteRef`](../../models/SiteRef.md#siteref) & `object` & `object` & `object`[]\>

Defined in: [src/operations/workbookTable/listWorkbookTables.ts:17](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookTable/listWorkbookTables.ts#L17)

Retrieve a list of tables in a worksheet.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `worksheetRef` | [`WorkbookWorksheetRef`](../../models/WorkbookWorksheetRef.md#workbookworksheetref) | A reference to the worksheet, optionally including session information. |

#### Returns

[`GraphOperation`](../../GraphOperation.md#graphoperation)\<`WorkbookTable` & [`SiteRef`](../../models/SiteRef.md#siteref) & `object` & `object` & `object`[]\>

An array of tables, each including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/worksheet-list-tables
