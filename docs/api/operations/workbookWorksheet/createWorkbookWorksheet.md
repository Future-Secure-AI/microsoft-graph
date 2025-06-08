[Microsoft Graph SDK](../../README.md) / operations/workbookWorksheet/createWorkbookWorksheet

## Functions

### createWorkbookWorksheet()

> **createWorkbookWorksheet**(`workbookRef`, `name?`): [`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`WorkbookWorksheet` & [`SiteRef`](../../models/SiteRef.md#siteref) & `object` & `object` & `object` & `object`\>

Defined in: [src/operations/workbookWorksheet/createWorkbookWorksheet.ts:19](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookWorksheet/createWorkbookWorksheet.ts#L19)

Create a new worksheet in a workbook, optionally with a defined name.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `workbookRef` | [`WorkbookRef`](../../models/WorkbookRef.md#workbookref) | A reference to the workbook where the worksheet will be created, optionally including session information. |
| `name?` | [`WorkbookWorksheetName`](../../models/WorkbookWorksheetName.md#workbookworksheetname) | (Optional) The name of the new worksheet. |

#### Returns

[`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`WorkbookWorksheet` & [`SiteRef`](../../models/SiteRef.md#siteref) & `object` & `object` & `object` & `object`\>

The newly created worksheet, including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/worksheetcollection-add
