[Microsoft Graph SDK](README.md) / Cell

# Cell

Cell in a worksheet.

## Type Aliases

### Cell

> **Cell** = `object`

Defined in: [src/models/Cell.ts:14](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L14)

Cell in a worksheet.

#### Remarks

Contrary to common expectation, while a cell does contain a single value, it also contains a text representation of that value and a number format that often defines that representation.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="alignment"></a> `alignment?` | `object` | **`Experimental`** Alignment of cell contents. | [src/models/Cell.ts:44](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L44) |
| `alignment.horizontal?` | `"General"` \| `"Left"` \| `"Center"` \| `"Right"` \| `"Fill"` \| `"Justify"` \| `"CenterAcrossSelection"` \| `"Distributed"` | - | [src/models/Cell.ts:45](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L45) |
| `alignment.vertical?` | `"Top"` \| `"Center"` \| `"Bottom"` \| `"Justify"` \| `"Distributed"` | - | [src/models/Cell.ts:46](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L46) |
| <a id="borders"></a> `borders?` | `object` | **`Experimental`** Borders around the cell. | [src/models/Cell.ts:58](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L58) |
| `borders.color?` | [`Color`](Color.md#color) | - | [src/models/Cell.ts:59](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L59) |
| `borders.side?` | `"EdgeTop"` \| `"EdgeBottom"` \| `"EdgeLeft"` \| `"EdgeRight"` \| `"InsideVertical"` \| `"InsideHorizontal"` \| `"DiagonalDown"` \| `"DiagonalUp"` | - | [src/models/Cell.ts:60](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L60) |
| `borders.style?` | `"None"` \| `"Continuous"` \| `"Dash"` \| `"DashDot"` \| `"DashDotDot"` \| `"Dot"` \| `"Double"` \| `"SlantDashDot"` | - | [src/models/Cell.ts:61](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L61) |
| `borders.weight?` | `"Hairline"` \| `"Thin"` \| `"Medium"` \| `"Thick"` | - | [src/models/Cell.ts:62](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L62) |
| <a id="fill"></a> `fill?` | `object` | **`Experimental`** Fill color of the cell. | [src/models/Cell.ts:80](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L80) |
| `fill.color?` | [`Color`](Color.md#color) | - | [src/models/Cell.ts:81](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L81) |
| <a id="font"></a> `font?` | `object` | **`Experimental`** Font settings for the cell. | [src/models/Cell.ts:88](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L88) |
| `font.bold?` | `boolean` | - | [src/models/Cell.ts:92](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L92) |
| `font.color?` | [`Color`](Color.md#color) | - | [src/models/Cell.ts:91](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L91) |
| `font.italic?` | `boolean` | - | [src/models/Cell.ts:93](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L93) |
| `font.name?` | [`FontName`](FontName.md#fontname) | - | [src/models/Cell.ts:89](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L89) |
| `font.size?` | `number` | - | [src/models/Cell.ts:90](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L90) |
| `font.underline?` | `"None"` \| `"Single"` \| `"Double"` \| `"SingleAccountant"` \| `"DoubleAccountant"` | - | [src/models/Cell.ts:94](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L94) |
| <a id="format"></a> `format` | [`CellFormat`](#cellformat-1) | Formatting that is applied to the value to derive the text representation. | [src/models/Cell.ts:29](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L29) |
| <a id="merge"></a> `merge?` | `object` | **`Experimental`** Number of cell merges (WRITE ONLY). **Remarks** Due to API limitations, this value is never populated when reading a cell, but it can be set when writing a cell. | [src/models/Cell.ts:36](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L36) |
| `merge.down?` | `number` | - | [src/models/Cell.ts:38](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L38) |
| `merge.right?` | `number` | - | [src/models/Cell.ts:37](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L37) |
| <a id="protection"></a> `protection?` | `object` | **`Experimental`** Protection settings for the cell. | [src/models/Cell.ts:69](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L69) |
| `protection.formulaHidden?` | `boolean` | Hide the formula. | [src/models/Cell.ts:71](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L71) |
| `protection.locked?` | `boolean` | Prevent cell changes | [src/models/Cell.ts:73](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L73) |
| <a id="text"></a> `text` | [`CellText`](#celltext-1) | The text representation of the cell's value. **Remarks** This is often the same as the value, but can differ in cases where the value is a number and the text representation is formatted (e.g., "1,000" vs. 1000), or in the case of the value being a formula. | [src/models/Cell.ts:19](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L19) |
| <a id="value"></a> `value` | [`CellValue`](#cellvalue-1) | The actual value of the cell. | [src/models/Cell.ts:24](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L24) |
| <a id="wraptext"></a> `wrapText?` | `boolean` | **`Experimental`** When text exceeds the cell width, it can either overflow into the next cell or wrap to the next line. | [src/models/Cell.ts:52](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L52) |

***

### CellFormat

> **CellFormat** = `string` & `object`

Defined in: [src/models/Cell.ts:114](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L114)

Format to be applied to a cell value to convert it to text to display to the user.

#### Type declaration

##### \_\_brand

> **\_\_brand**: `"CellFormat"`

#### See

[Cell](#cell) for a more comprehensive representation of a cell, which includes text and formatting.

***

### CellScope

> **CellScope** = `"Values"` \| `"ValuesText"` \| `"ValuesTextFormat"`

Defined in: [src/models/Cell.ts:122](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L122)

The amount of detail that we're reading from a cell.

#### Remarks

This is used to determine how much information we want to extract from a cell when reading it, since usually we just want values, sometimes we also want text, and rarely we want the format.

***

### CellText

> **CellText** = `string`

Defined in: [src/models/Cell.ts:102](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L102)

Text content of a cell in a worksheet.

#### Remarks

This is a string that represents the text displayed in the cell, which may differ from the actual value of the cell (e.g., due to formatting).

***

### CellValue

> **CellValue** = `string` \| `number` \| `boolean`

Defined in: [src/models/Cell.ts:108](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L108)

CellValue represents the value of a cell in a spreadsheet.

#### See

[Cell](#cell) for a more comprehensive representation of a cell, which includes text and formatting.
