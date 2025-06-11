[Microsoft Graph SDK](README.md) / Cell

# Cell

Cell in a worksheet.

## Type Aliases

### Cell

> **Cell** = `object`

Defined in: [src/models/Cell.ts:11](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L11)

Cell in a worksheet.

#### Remarks

Contrary to common expectation, while a cell does contain a single value, it also contains a text representation of that value and a number format that often defines that representation.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="format"></a> `format` | [`CellFormat`](#cellformat-1) | Formatting that is applied to the value to derive the text representation. | [src/models/Cell.ts:26](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L26) |
| <a id="text"></a> `text` | [`CellText`](#celltext-1) | The text representation of the cell's value. **Remarks** This is often the same as the value, but can differ in cases where the value is a number and the text representation is formatted (e.g., "1,000" vs. 1000), or in the case of the value being a formula. | [src/models/Cell.ts:16](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L16) |
| <a id="value"></a> `value` | [`CellValue`](#cellvalue-1) | The actual value of the cell. | [src/models/Cell.ts:21](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L21) |

***

### CellFormat

> **CellFormat** = `string` & `object`

Defined in: [src/models/Cell.ts:45](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L45)

Format to be applied to a cell value to convert it to text to display to the user.

#### Type declaration

##### \_\_brand

> **\_\_brand**: `"CellFormat"`

#### See

[Cell](#cell) for a more comprehensive representation of a cell, which includes text and formatting.

***

### CellText

> **CellText** = `string`

Defined in: [src/models/Cell.ts:33](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L33)

Text content of a cell in a worksheet.

#### Remarks

This is a string that represents the text displayed in the cell, which may differ from the actual value of the cell (e.g., due to formatting).

***

### CellValue

> **CellValue** = `string` \| `number` \| `boolean`

Defined in: [src/models/Cell.ts:39](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L39)

CellValue represents the value of a cell in a spreadsheet.

#### See

[Cell](#cell) for a more comprehensive representation of a cell, which includes text and formatting.
