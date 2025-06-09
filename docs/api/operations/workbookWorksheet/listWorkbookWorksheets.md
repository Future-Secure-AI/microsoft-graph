[Microsoft Graph SDK](../../README.md) / operations/workbookWorksheet/listWorkbookWorksheets

## Functions

### listWorkbookWorksheets()

> **listWorkbookWorksheets**(`workbookRef`): [`GraphOperation`](../../GraphOperation.md#graphoperation)\<`WorkbookWorksheet` & [`SiteRef`](../../SiteRef.md#siteref) & `object` & `object` & `object` & `object`[]\>

Defined in: [src/operations/workbookWorksheet/listWorkbookWorksheets.ts:18](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookWorksheet/listWorkbookWorksheets.ts#L18)

Retrieve a list of worksheets in a workbook.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `workbookRef` | [`WorkbookRef`](../../WorkbookRef.md#workbookref) | A reference to the workbook, optionally including session information. |

#### Returns

[`GraphOperation`](../../GraphOperation.md#graphoperation)\<`WorkbookWorksheet` & [`SiteRef`](../../SiteRef.md#siteref) & `object` & `object` & `object` & `object`[]\>

An array of worksheets, each including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/worksheet-list
