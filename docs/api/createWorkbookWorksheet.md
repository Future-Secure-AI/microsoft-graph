[Microsoft Graph SDK](README.md) / createWorkbookWorksheet

Create a new worksheet in a workbook, optionally with a defined name.

## Functions

### createWorkbookWorksheet()

> **createWorkbookWorksheet**(`workbookRef`, `name?`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookWorksheet` & [`SiteRef`](SiteRef.md#siteref) & `object` & `object` & `object` & `object`\>

Defined in: [src/operations/workbookWorksheet/createWorkbookWorksheet.ts:24](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookWorksheet/createWorkbookWorksheet.ts#L24)

Create a new worksheet in a workbook, optionally with a defined name.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `workbookRef` | [`WorkbookRef`](WorkbookRef.md#workbookref) | Reference to the workbook where the worksheet will be created. |
| `name?` | [`WorkbookWorksheetName`](WorkbookWorksheetName.md#workbookworksheetname) | (Optional) The name of the new worksheet. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookWorksheet` & [`SiteRef`](SiteRef.md#siteref) & `object` & `object` & `object` & `object`\>

The newly created worksheet.

#### See

https://learn.microsoft.com/en-us/graph/api/worksheetcollection-add
