[Microsoft Graph SDK](README.md) / getWorkbookWorksheetUsedRangeRef

Retrieve the address of the used range in a worksheet, ignoring trailing rows and columns that are blank.

## Functions

### getWorkbookWorksheetUsedRangeRef()

> **getWorkbookWorksheetUsedRangeRef**(`worksheetRef`): [`GraphOperation`](GraphOperation.md#graphoperation)\<[`WorkbookRangeRef`](WorkbookRangeRef.md#workbookrangeref)\>

Defined in: [src/operations/workbookWorksheet/getWorkbookWorksheetUsedRangeRef.ts:23](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookWorksheet/getWorkbookWorksheetUsedRangeRef.ts#L23)

Retrieve the address of the used range in a worksheet, ignoring trailing rows and columns that are blank.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `worksheetRef` | [`WorkbookWorksheetRef`](WorkbookWorksheetRef.md#workbookworksheetref) | Reference to the worksheet. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<[`WorkbookRangeRef`](WorkbookRangeRef.md#workbookrangeref)\>

Address of the used range of the worksheet.

#### See

https://learn.microsoft.com/en-us/graph/api/range-usedrange
