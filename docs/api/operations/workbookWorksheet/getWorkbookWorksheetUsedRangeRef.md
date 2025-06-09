[Microsoft Graph SDK](../../README.md) / operations/workbookWorksheet/getWorkbookWorksheetUsedRangeRef

## Functions

### getWorkbookWorksheetUsedRangeRef()

> **getWorkbookWorksheetUsedRangeRef**(`worksheetRef`): [`GraphOperation`](../../GraphOperation.md#graphoperation)\<[`WorkbookRangeRef`](../../models/WorkbookRangeRef.md#workbookrangeref)\>

Defined in: [src/operations/workbookWorksheet/getWorkbookWorksheetUsedRangeRef.ts:18](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookWorksheet/getWorkbookWorksheetUsedRangeRef.ts#L18)

Retrieve the address of the used range in a worksheet, ignoring trailing rows and columns that are blank.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `worksheetRef` | [`WorkbookWorksheetRef`](../../models/WorkbookWorksheetRef.md#workbookworksheetref) | A reference to the worksheet, optionally including session information. |

#### Returns

[`GraphOperation`](../../GraphOperation.md#graphoperation)\<[`WorkbookRangeRef`](../../models/WorkbookRangeRef.md#workbookrangeref)\>

Address of the used range of the worksheet.

#### See

https://learn.microsoft.com/en-us/graph/api/range-usedrange
