[Microsoft Graph SDK](../README.md) / tasks/setWorkbookRangeValues

## Functions

### setWorkbookRangeValues()

> **setWorkbookRangeValues**(`rangeRef`, `values`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: [src/tasks/setWorkbookRangeValues.ts:14](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/setWorkbookRangeValues.ts#L14)

Sets the values of a specified workbook range.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](../models/WorkbookRangeRef.md#workbookrangeref) | A reference to the workbook range to update. |
| `values` | [`CellValue`](../CellValue.md#cellvalue)[][] | The values to set in the specified workbook range. Must match the range's dimensions. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Nothing
