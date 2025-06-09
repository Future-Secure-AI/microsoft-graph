[Microsoft Graph SDK](../README.md) / services/workbookRange

## Functions

### createWorkbookRangeRef()

> **createWorkbookRangeRef**(`worksheetRef`, `address`): [`WorkbookRangeRef`](../models/WorkbookRangeRef.md#workbookrangeref)

Defined in: [src/services/workbookRange.ts:13](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/workbookRange.ts#L13)

Creates a reference to a workbook range.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `worksheetRef` | [`WorkbookWorksheetRef`](../models/WorkbookWorksheetRef.md#workbookworksheetref) | The reference to the worksheet containing the range. |
| `address` | `undefined` \| [`Address`](../Address.md#address) | The address of the range. |

#### Returns

[`WorkbookRangeRef`](../models/WorkbookRangeRef.md#workbookrangeref)

A reference to the workbook range.
