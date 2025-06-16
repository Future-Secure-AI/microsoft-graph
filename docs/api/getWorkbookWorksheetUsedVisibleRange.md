[Microsoft Graph SDK](README.md) / getWorkbookWorksheetUsedVisibleRange

# getWorkbookWorksheetUsedVisibleRange

Retrieve the visible (not hidden) range in a worksheet.

## Functions

### getWorkbookWorksheetUsedVisibleRange()

> **getWorkbookWorksheetUsedVisibleRange**(`worksheetRef`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookRange` & [`SiteRef`](Site-1.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Defined in: [src/operations/workbookWorksheet/getWorkbookWorksheetUsedVisibleRange.ts:23](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookWorksheet/getWorkbookWorksheetUsedVisibleRange.ts#L23)

Retrieve the visible (not hidden) range in a worksheet.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `worksheetRef` | [`WorkbookWorksheetRef`](WorkbookWorksheet-1.md#workbookworksheetref) | Reference to the worksheet. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookRange` & [`SiteRef`](Site-1.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

The visible range of the worksheet.

#### See

https://learn.microsoft.com/en-us/graph/api/range-usedrange
