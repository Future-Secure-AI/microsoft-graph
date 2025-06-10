[Microsoft Graph SDK](README.md) / createWorkbookWorksheet

# createWorkbookWorksheet

Create a new worksheet in a workbook, optionally with a defined name.

## Functions

### createWorkbookWorksheet()

> **createWorkbookWorksheet**(`workbookRef`, `name?`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookWorksheet` & [`SiteRef`](Site-1.md#siteref) & `object` & `object` & `object` & `object`\>

Defined in: [src/operations/workbookWorksheet/createWorkbookWorksheet.ts:23](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookWorksheet/createWorkbookWorksheet.ts#L23)

Create a new worksheet in a workbook, optionally with a defined name.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `workbookRef` | [`WorkbookRef`](Workbook.md#workbookref) | Reference to the workbook where the worksheet will be created. |
| `name?` | [`WorkbookWorksheetName`](WorkbookWorksheet-1.md#workbookworksheetname) | (Optional) The name of the new worksheet. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookWorksheet` & [`SiteRef`](Site-1.md#siteref) & `object` & `object` & `object` & `object`\>

The newly created worksheet.

#### See

https://learn.microsoft.com/en-us/graph/api/worksheetcollection-add

#### Remarks

While `createWorkbookWorksheet` returns a reference to the worksheet, `getWorkbookWorksheetByName` and `listWorkbookWorksheets` may be unable to see the worksheet for a number of seconds. Calling `calculateWorkbook` can hasten the availability of the new worksheet for these operations.
