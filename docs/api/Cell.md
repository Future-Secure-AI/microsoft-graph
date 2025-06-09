[Microsoft Graph SDK](README.md) / Cell

# Cell

Cell in a worksheet.

## Type Aliases

### Cell

> **Cell** = `object`

Defined in: [src/models/Cell.ts:15](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L15)

Cell in a worksheet.

#### Remarks

Contrary to common expectation, while a cell does contain a single value, it also contains a text representation of that value and a number format that often defines that representation.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="numberformat"></a> `numberFormat` | [`NumberFormat`](NumberFormat-1.md#numberformat) | Formatting that is applied to the value to derive the text representation. | [src/models/Cell.ts:30](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L30) |
| <a id="text"></a> `text` | [`CellText`](CellText-1.md#celltext) | The text representation of the cell's value. **Remarks** This is often the same as the value, but can differ in cases where the value is a number and the text representation is formatted (e.g., "1,000" vs. 1000), or in the case of the value being a formula. | [src/models/Cell.ts:20](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L20) |
| <a id="value"></a> `value` | [`CellValue`](CellValue.md#cellvalue) | The actual value of the cell. | [src/models/Cell.ts:25](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L25) |
