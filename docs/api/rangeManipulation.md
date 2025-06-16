[Microsoft Graph SDK](README.md) / rangeManipulation

# rangeManipulation

Utilities for inferring and manipulating spreadsheet ranges and objects.

## Functions

### inferObjectRange()

> **inferObjectRange**(`objs`, `header`): [`CellValue`](Cell.md#cellvalue-1)[][]

Defined in: [src/services/rangeManipulation.ts:120](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/rangeManipulation.ts#L120)

Converts an array of objects into a 2D array of cell values.
The first row of the 2D array contains the keys as headers.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `objs` | `unknown`[] | `undefined` | Array of objects to convert. |
| `header` | `null` \| `string`[] | `null` | Optional header row. If not provided, it will be inferred from the object keys. |

#### Returns

[`CellValue`](Cell.md#cellvalue-1)[][]

A 2D array where the first row is the header and subsequent rows are the object values.

***

### inferRangeAddress()

> **inferRangeAddress**(`values`, `rowOffset?`, `columnOffset?`): [`Address`](Address.md#address)

Defined in: [src/services/rangeManipulation.ts:23](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/rangeManipulation.ts#L23)

Converts a 2D array of cell values into range address in the upper left.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `values` | [`CellValue`](Cell.md#cellvalue-1)[][] | A 2D array representing cell values. |
| `rowOffset?` | [`RowOffset`](Row.md#rowoffset) | The row offset to apply to the range address. |
| `columnOffset?` | [`ColumnOffset`](Column.md#columnoffset) | The column offset to apply to the range address. |

#### Returns

[`Address`](Address.md#address)

The default cell range address (e.g., "A1:C3").

#### Throws

If rows have inconsistent column counts.

***

### inferRangeObject()

> **inferRangeObject**(`values`): `unknown`[]

Defined in: [src/services/rangeManipulation.ts:90](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/rangeManipulation.ts#L90)

Converts a 2D array of cell values into an array of objects.
Assumes the first row is a header and uses it as keys for the objects.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `values` | [`CellValue`](Cell.md#cellvalue-1)[][] | A 2D array representing cell values. |

#### Returns

`unknown`[]

Array of objects where each object represents a row.

#### Throws

If rows have inconsistent column counts or no header row is present.

***

### inferRowAddress()

> **inferRowAddress**(`row`, `rowOffset?`, `columnOffset?`): [`Address`](Address.md#address)

Defined in: [src/services/rangeManipulation.ts:63](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/rangeManipulation.ts#L63)

Converts a 2D array of cell values into a row address in the upper left.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `row` | [`CellValue`](Cell.md#cellvalue-1)[] | A single row of cell values. |
| `rowOffset?` | [`RowOffset`](Row.md#rowoffset) | The row offset to apply to the address. |
| `columnOffset?` | [`ColumnOffset`](Column.md#columnoffset) | The column offset to apply to the address. |

#### Returns

[`Address`](Address.md#address)

The default cell range address for the row (e.g., "A1").
