[Microsoft Graph SDK](../../README.md) / operations/workbookWorksheet/deleteWorkbookWorksheet

## Functions

### deleteWorkbookWorksheet()

> **deleteWorkbookWorksheet**(`worksheetRef`): [`GraphOperation`](../../GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/workbookWorksheet/deleteWorkbookWorksheet.ts:13](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookWorksheet/deleteWorkbookWorksheet.ts#L13)

Permanently delete a worksheet.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `worksheetRef` | [`WorkbookWorksheetRef`](../../models/WorkbookWorksheetRef.md#workbookworksheetref) | A reference to the worksheet to be deleted, optionally including session information. |

#### Returns

[`GraphOperation`](../../GraphOperation.md#graphoperation)\<`void`\>

Nothing.

#### See

https://learn.microsoft.com/en-us/graph/api/worksheet-delete
