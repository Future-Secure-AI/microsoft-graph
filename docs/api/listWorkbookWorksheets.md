[Microsoft Graph SDK](README.md) / listWorkbookWorksheets

Retrieve a list of worksheets in a workbook.

## Functions

### listWorkbookWorksheets()

> **listWorkbookWorksheets**(`workbookRef`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookWorksheet` & [`SiteRef`](SiteRef.md#siteref) & `object` & `object` & `object` & `object`[]\>

Defined in: [src/operations/workbookWorksheet/listWorkbookWorksheets.ts:23](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookWorksheet/listWorkbookWorksheets.ts#L23)

Retrieve a list of worksheets in a workbook.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `workbookRef` | [`WorkbookRef`](WorkbookRef.md#workbookref) | Reference to the workbook. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookWorksheet` & [`SiteRef`](SiteRef.md#siteref) & `object` & `object` & `object` & `object`[]\>

Array of worksheets, each including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/worksheet-list
