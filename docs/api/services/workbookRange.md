[Microsoft Graph SDK](../modules.md) / services/workbookRange

## Functions

### createWorkbookRangeRef()

> **createWorkbookRangeRef**(`worksheetRef`, `address`): [`WorkbookRangeRef`](../models/WorkbookRangeRef.md#workbookrangeref)

Defined in: [src/services/workbookRange.ts:13](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/services/workbookRange.ts#L13)

Creates a reference to a workbook range.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `worksheetRef` | [`WorkbookWorksheetRef`](../models/WorkbookWorksheetRef.md#workbookworksheetref) | The reference to the worksheet containing the range. |
| `address` | `undefined` \| [`Address`](../models/Address.md#address) | The address of the range. |

#### Returns

[`WorkbookRangeRef`](../models/WorkbookRangeRef.md#workbookrangeref)

A reference to the workbook range.
