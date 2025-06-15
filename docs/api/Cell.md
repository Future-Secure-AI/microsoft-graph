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
| <a id="format"></a> `format` | [`CellFormat`](#cellformat-1) | Formatting that is applied to the value to derive the text representation. | [src/models/Cell.ts:30](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L30) |
| <a id="style"></a> `style` | [`CellStyle`](#cellstyle-1) | Style applied to the cell to affect its appearance, like color, borders, alignment, etc. | [src/models/Cell.ts:35](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L35) |
| <a id="text"></a> `text` | [`CellText`](#celltext-1) | The text representation of the cell's value. **Remarks** This is often the same as the value, but can differ in cases where the value is a number and the text representation is formatted (e.g., "1,000" vs. 1000), or in the case of the value being a formula. | [src/models/Cell.ts:20](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L20) |
| <a id="value"></a> `value` | [`CellValue`](#cellvalue-1) | The actual value of the cell. | [src/models/Cell.ts:25](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L25) |

***

### CellFormat

> **CellFormat** = `string` & `object`

Defined in: [src/models/Cell.ts:54](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L54)

Format to be applied to a cell value to convert it to text to display to the user.

#### Type declaration

##### \_\_brand

> **\_\_brand**: `"CellFormat"`

#### See

[Cell](#cell) for a more comprehensive representation of a cell, which includes text and formatting.

***

### CellHorizontalAlignment

> **CellHorizontalAlignment** = `"General"` \| `"Left"` \| `"Center"` \| `"Right"` \| `"Fill"` \| `"Justify"` \| `"CenterAcrossSelection"` \| `"Distributed"`

Defined in: [src/models/Cell.ts:150](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L150)

***

### CellScope

> **CellScope** = `object`

Defined in: [src/models/Cell.ts:127](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L127)

The amount of detail that we're reading from a cell.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="alignment"></a> `alignment` | `boolean` | Content position with the cell. VERY EXPENSIVE (+1 op per cell) | [src/models/Cell.ts:138](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L138) |
| <a id="borders"></a> `borders` | `boolean` | Cell borders. VERY EXPENSIVE (+1 op per cell) | [src/models/Cell.ts:141](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L141) |
| <a id="fill"></a> `fill` | `boolean` | Background fill style. VERY EXPENSIVE (+1 op per cell) | [src/models/Cell.ts:144](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L144) |
| <a id="font"></a> `font` | `boolean` | Text style. VERY EXPENSIVE (+1 op per cell) | [src/models/Cell.ts:147](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L147) |
| <a id="format-1"></a> `format` | `boolean` | Logic used to format values to text. CHEAP (~1 op per 10K cells, no additional call op `values` or `text`) | [src/models/Cell.ts:135](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L135) |
| <a id="text-1"></a> `text` | `boolean` | Formatted value, as presented to the user. CHEAP (~1 op per 10K cells, no additional call op `values` or `format`) | [src/models/Cell.ts:132](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L132) |
| <a id="values"></a> `values` | `boolean` | Raw cell value. CHEAP (~1 op per 10K cells, no additional op with `text` or `format`) | [src/models/Cell.ts:129](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L129) |

***

### CellStyle

> **CellStyle** = `object`

Defined in: [src/models/Cell.ts:61](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L61)

Style applied to the cell to affect its appearance, like color, borders, alignment, etc.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="alignment-1"></a> `alignment` | `object` | **`Experimental`** Alignment of cell contents. | [src/models/Cell.ts:75](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L75) |
| `alignment.horizontal?` | [`CellHorizontalAlignment`](#cellhorizontalalignment) | - | [src/models/Cell.ts:76](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L76) |
| `alignment.vertical?` | [`CellVerticalAlignment`](#cellverticalalignment) | - | [src/models/Cell.ts:77](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L77) |
| `alignment.wrapText?` | `boolean` | - | [src/models/Cell.ts:78](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L78) |
| <a id="borders-1"></a> `borders` | `object` | **`Experimental`** Borders around the cell. | [src/models/Cell.ts:84](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L84) |
| `borders.bottom?` | [`Border`](Border.md#border) | - | [src/models/Cell.ts:86](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L86) |
| `borders.diagonalDown?` | [`Border`](Border.md#border) | - | [src/models/Cell.ts:91](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L91) |
| `borders.diagonalUp?` | [`Border`](Border.md#border) | - | [src/models/Cell.ts:92](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L92) |
| `borders.insideHorizontal?` | [`Border`](Border.md#border) | - | [src/models/Cell.ts:90](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L90) |
| `borders.insideVertical?` | [`Border`](Border.md#border) | - | [src/models/Cell.ts:89](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L89) |
| `borders.left?` | [`Border`](Border.md#border) | - | [src/models/Cell.ts:87](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L87) |
| `borders.right?` | [`Border`](Border.md#border) | - | [src/models/Cell.ts:88](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L88) |
| `borders.top?` | [`Border`](Border.md#border) | - | [src/models/Cell.ts:85](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L85) |
| <a id="fill-1"></a> `fill` | `object` | **`Experimental`** Fill color of the cell. | [src/models/Cell.ts:107](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L107) |
| `fill.color?` | [`Color`](Color.md#color) | - | [src/models/Cell.ts:108](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L108) |
| <a id="font-1"></a> `font` | `object` | **`Experimental`** Font settings for the cell. | [src/models/Cell.ts:114](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L114) |
| `font.bold?` | `boolean` | - | [src/models/Cell.ts:118](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L118) |
| `font.color?` | [`Color`](Color.md#color) | - | [src/models/Cell.ts:117](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L117) |
| `font.italic?` | `boolean` | - | [src/models/Cell.ts:119](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L119) |
| `font.name?` | [`FontName`](FontName.md#fontname) | - | [src/models/Cell.ts:115](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L115) |
| `font.size?` | `number` | - | [src/models/Cell.ts:116](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L116) |
| `font.underline?` | [`CellUnderline`](#cellunderline) | - | [src/models/Cell.ts:120](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L120) |
| <a id="merge"></a> `merge` | `object` | **`Experimental`** Number of cell merges (WRITE ONLY). **Remarks** Due to API limitations, this value is never populated when reading a cell, but it can be set when writing a cell. | [src/models/Cell.ts:67](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L67) |
| `merge.down?` | `number` | - | [src/models/Cell.ts:69](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L69) |
| `merge.right?` | `number` | - | [src/models/Cell.ts:68](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L68) |

***

### CellText

> **CellText** = `string`

Defined in: [src/models/Cell.ts:48](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L48)

Text content of a cell in a worksheet.

#### Remarks

This is a string that represents the text displayed in the cell, which may differ from the actual value of the cell (e.g., due to formatting).

***

### CellUnderline

> **CellUnderline** = `"None"` \| `"Single"` \| `"Double"` \| `"SingleAccountant"` \| `"DoubleAccountant"`

Defined in: [src/models/Cell.ts:154](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L154)

***

### CellValue

> **CellValue** = `string` \| `number` \| `boolean`

Defined in: [src/models/Cell.ts:42](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L42)

CellValue represents the value of a cell in a spreadsheet.

#### See

[Cell](#cell) for a more comprehensive representation of a cell, which includes text and formatting.

***

### CellVerticalAlignment

> **CellVerticalAlignment** = `"Top"` \| `"Center"` \| `"Bottom"` \| `"Justify"` \| `"Distributed"`

Defined in: [src/models/Cell.ts:152](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L152)
