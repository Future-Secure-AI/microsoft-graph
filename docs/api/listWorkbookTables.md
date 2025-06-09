[Microsoft Graph SDK](README.md) / listWorkbookTables

Retrieve a list of tables in a worksheet.

## Functions

### listWorkbookTables()

> **listWorkbookTables**(`worksheetRef`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookTable` & [`SiteRef`](SiteRef.md#siteref) & `object` & `object` & `object`[]\>

Defined in: [src/operations/workbookTable/listWorkbookTables.ts:22](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookTable/listWorkbookTables.ts#L22)

Retrieve a list of tables in a worksheet.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `worksheetRef` | [`WorkbookWorksheetRef`](WorkbookWorksheetRef.md#workbookworksheetref) | Reference to the worksheet. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookTable` & [`SiteRef`](SiteRef.md#siteref) & `object` & `object` & `object`[]\>

Array of tables, each including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/worksheet-list-tables
