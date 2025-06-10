[Microsoft Graph SDK](README.md) / getWorkbookWorksheetByName

# getWorkbookWorksheetByName

Retrieve a worksheet by its name from a workbook.

## Functions

### getWorkbookWorksheetByName()

> **getWorkbookWorksheetByName**(`workbookRef`, `worksheetName`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookWorksheet` & [`SiteRef`](Site-1.md#siteref) & `object` & `object` & `object` & `object`\>

Defined in: src/operations/workbookWorksheet/getWorkbookWorksheetByName.ts:22

Retrieve a worksheet by its name from a workbook.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `workbookRef` | [`WorkbookRef`](Workbook.md#workbookref) | Reference to the workbook. |
| `worksheetName` | [`WorkbookWorksheetName`](WorkbookWorksheet-1.md#workbookworksheetname) | The name of the worksheet to retrieve. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookWorksheet` & [`SiteRef`](Site-1.md#siteref) & `object` & `object` & `object` & `object`\>

The worksheet object.

#### See

https://learn.microsoft.com/en-us/graph/api/worksheet-get
