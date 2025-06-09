[Microsoft Graph SDK](../../README.md) / operations/workbookWorksheet/getWorkbookWorksheetUsedRange

## Functions

### getWorkbookWorksheetUsedRange()

> **getWorkbookWorksheetUsedRange**(`worksheetRef`): [`GraphOperation`](../../GraphOperation.md#graphoperation)\<`WorkbookRange` & [`SiteRef`](../../SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Defined in: [src/operations/workbookWorksheet/getWorkbookWorksheetUsedRange.ts:18](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookWorksheet/getWorkbookWorksheetUsedRange.ts#L18)

Retrieve the used range in a worksheet, ignoring trailing rows and columns that are blank.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `worksheetRef` | [`WorkbookWorksheetRef`](../../WorkbookWorksheetRef.md#workbookworksheetref) | A reference to the worksheet, optionally including session information. |

#### Returns

[`GraphOperation`](../../GraphOperation.md#graphoperation)\<`WorkbookRange` & [`SiteRef`](../../SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

The used range of the worksheet, including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/range-usedrange
