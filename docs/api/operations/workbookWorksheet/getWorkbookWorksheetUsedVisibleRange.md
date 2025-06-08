[Microsoft Graph SDK](../../modules.md) / operations/workbookWorksheet/getWorkbookWorksheetUsedVisibleRange

## Functions

### getWorkbookWorksheetUsedVisibleRange()

> **getWorkbookWorksheetUsedVisibleRange**(`worksheetRef`): [`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`WorkbookRange` & [`SiteRef`](../../models/SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Defined in: [src/operations/workbookWorksheet/getWorkbookWorksheetUsedVisibleRange.ts:17](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/operations/workbookWorksheet/getWorkbookWorksheetUsedVisibleRange.ts#L17)

Retrieve the visible (not hidden) range in a worksheet.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `worksheetRef` | [`WorkbookWorksheetRef`](../../models/WorkbookWorksheetRef.md#workbookworksheetref) | A reference to the worksheet, optionally including session information. |

#### Returns

[`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`WorkbookRange` & [`SiteRef`](../../models/SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

The visible range of the worksheet, including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/range-usedrange
