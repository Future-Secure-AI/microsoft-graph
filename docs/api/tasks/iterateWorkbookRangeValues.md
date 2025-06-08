[Microsoft Graph SDK](../modules.md) / tasks/iterateWorkbookRangeValues

## Functions

### ~~iterateWorkbookRangeValues()~~

> **iterateWorkbookRangeValues**(`rangeRef`, `overwriteRowsPerRequest`): `AsyncIterable`\<[`CellValue`](../models/CellValue.md#cellvalue)[]\>

Defined in: [src/tasks/iterateWorkbookRangeValues.ts:19](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/tasks/iterateWorkbookRangeValues.ts#L19)

Iterates over the values of a workbook range in chunks, fetching data in manageable sizes.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](../models/WorkbookRangeRef.md#workbookrangeref) | `undefined` | A reference to the workbook range to iterate over. |
| `overwriteRowsPerRequest` | `null` \| `number` | `null` | Optional. The number of rows to fetch per request. If omitted, it is automatically calculated. |

#### Returns

`AsyncIterable`\<[`CellValue`](../models/CellValue.md#cellvalue)[]\>

An async iterable that yields rows of range values.

#### Deprecated

Use `readWorkbookRows` instead.
