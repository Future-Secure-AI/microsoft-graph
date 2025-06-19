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
| <a id="alignment"></a> `alignment` | `object` | **`Experimental`** Alignment of cell contents. | [src/models/Cell.ts:46](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L46) |
| `alignment.horizontal?` | [`CellHorizontalAlignment`](#cellhorizontalalignment) | - | [src/models/Cell.ts:47](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L47) |
| `alignment.vertical?` | [`CellVerticalAlignment`](#cellverticalalignment) | - | [src/models/Cell.ts:48](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L48) |
| `alignment.wrapText?` | `boolean` | - | [src/models/Cell.ts:49](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L49) |
| <a id="borders"></a> `borders` | `object` | **`Experimental`** Borders around the cell. | [src/models/Cell.ts:56](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L56) |
| `borders.diagonalDown?` | [`Border`](Border.md#border) | - | [src/models/Cell.ts:63](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L63) |
| `borders.diagonalUp?` | [`Border`](Border.md#border) | - | [src/models/Cell.ts:64](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L64) |
| `borders.edgeBottom?` | [`Border`](Border.md#border) | - | [src/models/Cell.ts:58](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L58) |
| `borders.edgeLeft?` | [`Border`](Border.md#border) | - | [src/models/Cell.ts:59](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L59) |
| `borders.edgeRight?` | [`Border`](Border.md#border) | - | [src/models/Cell.ts:60](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L60) |
| `borders.edgeTop?` | [`Border`](Border.md#border) | - | [src/models/Cell.ts:57](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L57) |
| `borders.insideHorizontal?` | [`Border`](Border.md#border) | - | [src/models/Cell.ts:62](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L62) |
| `borders.insideVertical?` | [`Border`](Border.md#border) | - | [src/models/Cell.ts:61](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L61) |
| <a id="fill"></a> `fill` | `object` | **`Experimental`** Fill color of the cell. | [src/models/Cell.ts:71](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L71) |
| `fill.color?` | [`Color`](Color.md#color) | - | [src/models/Cell.ts:72](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L72) |
| <a id="font"></a> `font` | `object` | **`Experimental`** Font settings for the cell. | [src/models/Cell.ts:78](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L78) |
| `font.bold?` | `boolean` | - | [src/models/Cell.ts:82](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L82) |
| `font.color?` | [`Color`](Color.md#color) | - | [src/models/Cell.ts:81](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L81) |
| `font.italic?` | `boolean` | - | [src/models/Cell.ts:83](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L83) |
| `font.name?` | [`FontName`](FontName.md#fontname) | - | [src/models/Cell.ts:79](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L79) |
| `font.size?` | `number` | - | [src/models/Cell.ts:80](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L80) |
| `font.underline?` | [`CellUnderline`](#cellunderline) | - | [src/models/Cell.ts:84](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L84) |
| <a id="format"></a> `format` | [`CellFormat`](#cellformat-1) | Formatting that is applied to the value to derive the text representation. | [src/models/Cell.ts:30](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L30) |
| <a id="merge"></a> `merge` | `object` | **`Experimental`** Number of cell merges (WRITE ONLY). **Remarks** Due to API limitations, this value is never populated when reading a cell, but it can be set when writing a cell. | [src/models/Cell.ts:37](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L37) |
| `merge.down?` | `number` | - | [src/models/Cell.ts:39](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L39) |
| `merge.right?` | `number` | - | [src/models/Cell.ts:38](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L38) |
| <a id="text"></a> `text` | [`CellText`](#celltext-1) | The text representation of the cell's value. **Remarks** This is often the same as the value, but can differ in cases where the value is a number and the text representation is formatted (e.g., "1,000" vs. 1000), or in the case of the value being a formula. | [src/models/Cell.ts:20](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L20) |
| <a id="value"></a> `value` | [`CellValue`](#cellvalue-1) | The actual value of the cell. | [src/models/Cell.ts:25](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L25) |

***

### CellFormat

> **CellFormat** = `string` & `object`

Defined in: [src/models/Cell.ts:104](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L104)

Format to be applied to a cell value to convert it to text to display to the user.

#### Type declaration

##### \_\_brand

> **\_\_brand**: `"CellFormat"`

#### See

[Cell](#cell) for a more comprehensive representation of a cell, which includes text and formatting.

***

### CellHorizontalAlignment

> **CellHorizontalAlignment** = `"General"` \| `"Left"` \| `"Center"` \| `"Right"` \| `"Fill"` \| `"Justify"` \| `"CenterAcrossSelection"` \| `"Distributed"`

Defined in: [src/models/Cell.ts:134](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L134)

***

### CellScope

> **CellScope** = `object`

Defined in: [src/models/Cell.ts:111](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L111)

The amount of detail that we're reading from a cell.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="alignment-1"></a> `alignment` | `boolean` | Content position with the cell. VERY EXPENSIVE (+1 op per cell) | [src/models/Cell.ts:122](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L122) |
| <a id="border"></a> `border` | `boolean` | Cell borders. VERY EXPENSIVE (+1 op per cell) | [src/models/Cell.ts:125](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L125) |
| <a id="fill-1"></a> `fill` | `boolean` | Background fill style. VERY EXPENSIVE (+1 op per cell) | [src/models/Cell.ts:128](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L128) |
| <a id="font-1"></a> `font` | `boolean` | Text style. VERY EXPENSIVE (+1 op per cell) | [src/models/Cell.ts:131](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L131) |
| <a id="format-1"></a> `format` | `boolean` | Logic used to format values to text. CHEAP (+1 op per 10K cells, no additional call op `values` or `text`) | [src/models/Cell.ts:119](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L119) |
| <a id="text-1"></a> `text` | `boolean` | Formatted value, as presented to the user. CHEAP (+1 op per 10K cells, no additional call op `values` or `format`) | [src/models/Cell.ts:116](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L116) |
| <a id="value-1"></a> `value` | `boolean` | Raw cell value. CHEAP (+1 op per 10K cells, no additional op with `text` or `format`) | [src/models/Cell.ts:113](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L113) |

***

### CellText

> **CellText** = `string`

Defined in: [src/models/Cell.ts:98](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L98)

Text content of a cell in a worksheet.

#### Remarks

This is a string that represents the text displayed in the cell, which may differ from the actual value of the cell (e.g., due to formatting).

***

### CellUnderline

> **CellUnderline** = `"None"` \| `"Single"` \| `"Double"` \| `"SingleAccountant"` \| `"DoubleAccountant"`

Defined in: [src/models/Cell.ts:138](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L138)

***

### CellValue

> **CellValue** = `string` \| `number` \| `boolean`

Defined in: [src/models/Cell.ts:92](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L92)

CellValue represents the value of a cell in a spreadsheet.

#### See

[Cell](#cell) for a more comprehensive representation of a cell, which includes text and formatting.

***

### CellVerticalAlignment

> **CellVerticalAlignment** = `"Top"` \| `"Center"` \| `"Bottom"` \| `"Justify"` \| `"Distributed"`

Defined in: [src/models/Cell.ts:136](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L136)
