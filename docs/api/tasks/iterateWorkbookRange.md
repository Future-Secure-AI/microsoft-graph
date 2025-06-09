[Microsoft Graph SDK](../README.md) / tasks/iterateWorkbookRange

## Functions

### ~~iterateWorkbookRange()~~

> **iterateWorkbookRange**(`rangeRef`, `overwriteRowsPerRequest`): `AsyncIterable`\<\{ `row`: [`Row`](../models/Row.md#row); `rowOffset`: [`RowOffset`](../RowOffset.md#rowoffset); \}\>

Defined in: [src/tasks/iterateWorkbookRange.ts:22](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/iterateWorkbookRange.ts#L22)

Iterates over the values of a workbook range in chunks, fetching data in manageable sizes.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](../models/WorkbookRangeRef.md#workbookrangeref) | `undefined` | A reference to the workbook range to iterate over. |
| `overwriteRowsPerRequest` | `null` \| `number` | `null` | Optional. The number of rows to fetch per request. If omitted, it is automatically calculated. |

#### Returns

`AsyncIterable`\<\{ `row`: [`Row`](../models/Row.md#row); `rowOffset`: [`RowOffset`](../RowOffset.md#rowoffset); \}\>

An async iterable that yields rows of range values.

#### Deprecated

Use `readWorkbookRows` instead.
