[Microsoft Graph SDK](README.md) / getWorkbookWorksheetUsedRange

# getWorkbookWorksheetUsedRange

Retrieve the used range in a worksheet, ignoring trailing rows and columns that are blank.

## Functions

### getWorkbookWorksheetUsedRange()

> **getWorkbookWorksheetUsedRange**(`worksheetRef`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookRange` & [`SiteRef`](SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Defined in: [src/operations/workbookWorksheet/getWorkbookWorksheetUsedRange.ts:23](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookWorksheet/getWorkbookWorksheetUsedRange.ts#L23)

Retrieve the used range in a worksheet, ignoring trailing rows and columns that are blank.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `worksheetRef` | [`WorkbookWorksheetRef`](WorkbookWorksheetRef.md#workbookworksheetref) | Reference to the worksheet. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookRange` & [`SiteRef`](SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Used range of the worksheet.

#### See

https://learn.microsoft.com/en-us/graph/api/range-usedrange
