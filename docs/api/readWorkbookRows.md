[Microsoft Graph SDK](README.md) / readWorkbookRows

# readWorkbookRows

Iterates over the rows in a given worksheet range.

## Functions

### readWorkbookRows()

> **readWorkbookRows**(`rangeRef`, `overwriteMaxRowsPerChunk`): `AsyncIterable`\<[`Row`](Row.md#row)\>

Defined in: [src/tasks/readWorkbookRows.ts:28](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/readWorkbookRows.ts#L28)

Iterates over the rows in a given worksheet range.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](WorkbookRangeRef.md#workbookrangeref) | `undefined` | Reference to the workbook range to iterate over. |
| `overwriteMaxRowsPerChunk` | `null` \| `number` | `null` | Overwrite the number of rows per underlying request. DO NOT SET EXCEPT FOR ADVANCED TUNING. |

#### Returns

`AsyncIterable`\<[`Row`](Row.md#row)\>

An async iterable that yields rows of range values.

#### Throws

[InvalidArgumentError](InvalidArgumentError.md) If `overwriteMaxRowsPerChunk` is set to a value less than 1.
