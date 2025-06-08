[Microsoft Graph SDK](../modules.md) / services/rangeManipulation

## Functions

### inferObjectRange()

> **inferObjectRange**(`objs`, `header`): [`CellValue`](../models/CellValue.md#cellvalue)[][]

Defined in: [src/services/rangeManipulation.ts:114](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/services/rangeManipulation.ts#L114)

Converts an array of objects into a 2D array of cell values.
The first row of the 2D array contains the keys as headers.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `objs` | `unknown`[] | `undefined` | An array of objects to convert. |
| `header` | `null` \| `string`[] | `null` | Optional header row. If not provided, it will be inferred from the object keys. |

#### Returns

[`CellValue`](../models/CellValue.md#cellvalue)[][]

A 2D array where the first row is the header and subsequent rows are the object values.

***

### inferRangeAddress()

> **inferRangeAddress**(`values`, `rowOffset?`, `columnOffset?`): [`Address`](../models/Address.md#address)

Defined in: [src/services/rangeManipulation.ts:17](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/services/rangeManipulation.ts#L17)

Converts a 2D array of cell values into range address in the upper left.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `values` | [`CellValue`](../models/CellValue.md#cellvalue)[][] | A 2D array representing cell values. |
| `rowOffset?` | [`RowOffset`](../models/RowOffset.md#rowoffset) | The row offset to apply to the range address. |
| `columnOffset?` | [`ColumnOffset`](../models/ColumnOffset.md#columnoffset) | The column offset to apply to the range address. |

#### Returns

[`Address`](../models/Address.md#address)

The default cell range address (e.g., "A1:C3").

#### Throws

If rows have inconsistent column counts.

***

### inferRangeObject()

> **inferRangeObject**(`values`): `unknown`[]

Defined in: [src/services/rangeManipulation.ts:84](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/services/rangeManipulation.ts#L84)

Converts a 2D array of cell values into an array of objects.
Assumes the first row is a header and uses it as keys for the objects.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `values` | [`CellValue`](../models/CellValue.md#cellvalue)[][] | A 2D array representing cell values. |

#### Returns

`unknown`[]

An array of objects where each object represents a row.

#### Throws

If rows have inconsistent column counts or no header row is present.

***

### inferRowAddress()

> **inferRowAddress**(`row`, `rowOffset?`, `columnOffset?`): [`Address`](../models/Address.md#address)

Defined in: [src/services/rangeManipulation.ts:57](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/services/rangeManipulation.ts#L57)

Converts a 2D array of cell values into a row address in the upper left.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `row` | [`CellValue`](../models/CellValue.md#cellvalue)[] | A single row of cell values. |
| `rowOffset?` | [`RowOffset`](../models/RowOffset.md#rowoffset) | The row offset to apply to the address. |
| `columnOffset?` | [`ColumnOffset`](../models/ColumnOffset.md#columnoffset) | The column offset to apply to the address. |

#### Returns

[`Address`](../models/Address.md#address)

The default cell range address for the row (e.g., "A1").
