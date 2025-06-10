[Microsoft Graph SDK](README.md) / workbookRange

# workbookRange

Utilities for working with workbook ranges and references.

## Functions

### createWorkbookRangeRef()

> **createWorkbookRangeRef**(`worksheetRef`, `address`): [`WorkbookRangeRef`](WorkbookRange-1.md#workbookrangeref)

Defined in: [src/services/workbookRange.ts:19](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/workbookRange.ts#L19)

Creates a reference to a workbook range.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `worksheetRef` | [`WorkbookWorksheetRef`](WorkbookWorksheet-1.md#workbookworksheetref) | The reference to the worksheet containing the range. |
| `address` | `undefined` \| [`Address`](Address.md#address) | The address of the range. |

#### Returns

[`WorkbookRangeRef`](WorkbookRange-1.md#workbookrangeref)

A reference to the workbook range.
