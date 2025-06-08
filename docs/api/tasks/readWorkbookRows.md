[Microsoft Graph SDK](../README.md) / tasks/readWorkbookRows

## Functions

### readWorkbookRows()

> **readWorkbookRows**(`rangeRef`, `overwriteMaxRowsPerChunk`): `AsyncIterable`\<[`Row`](../models/Row.md#row)\>

Defined in: [src/tasks/readWorkbookRows.ts:21](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/readWorkbookRows.ts#L21)

Iterates over the values of a workbook range in chunks, fetching data in manageable sizes.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](../models/WorkbookRangeRef.md#workbookrangeref) | `undefined` | A reference to the workbook range to iterate over. |
| `overwriteMaxRowsPerChunk` | `null` \| `number` | `null` | Optional. The number of rows to fetch per request. If omitted, it is automatically calculated. |

#### Returns

`AsyncIterable`\<[`Row`](../models/Row.md#row)\>

An async iterable that yields rows of range values.
