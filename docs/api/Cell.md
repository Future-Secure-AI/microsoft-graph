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
| `borders.diagonalDown?` | [`Border`](Border.md#border) | - | [src/models/Cell.ts:64](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L64) |
| `borders.diagonalUp?` | [`Border`](Border.md#border) | - | [src/models/Cell.ts:65](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L65) |
| `borders.edgeBottom?` | [`Border`](Border.md#border) | - | [src/models/Cell.ts:59](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L59) |
| `borders.edgeLeft?` | [`Border`](Border.md#border) | - | [src/models/Cell.ts:60](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L60) |
| `borders.edgeRight?` | [`Border`](Border.md#border) | - | [src/models/Cell.ts:61](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L61) |
| `borders.edgeTop?` | [`Border`](Border.md#border) | - | [src/models/Cell.ts:58](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L58) |
| `borders.insideHorizontal?` | [`Border`](Border.md#border) | - | [src/models/Cell.ts:63](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L63) |
| `borders.insideVertical?` | [`Border`](Border.md#border) | - | [src/models/Cell.ts:62](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L62) |
| <a id="fill"></a> `fill` | `object` | **`Experimental`** Fill color of the cell. | [src/models/Cell.ts:72](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L72) |
| `fill.color?` | [`Color`](Color.md#color) | - | [src/models/Cell.ts:73](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L73) |
| <a id="font"></a> `font` | `object` | **`Experimental`** Font settings for the cell. | [src/models/Cell.ts:79](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L79) |
| `font.bold?` | `boolean` | - | [src/models/Cell.ts:83](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L83) |
| `font.color?` | [`Color`](Color.md#color) | - | [src/models/Cell.ts:82](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L82) |
| `font.italic?` | `boolean` | - | [src/models/Cell.ts:84](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L84) |
| `font.name?` | [`FontName`](FontName.md#fontname) | - | [src/models/Cell.ts:80](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L80) |
| `font.size?` | `number` | - | [src/models/Cell.ts:81](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L81) |
| `font.underline?` | [`CellUnderline`](#cellunderline) | - | [src/models/Cell.ts:85](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L85) |
| <a id="format"></a> `format` | [`CellFormat`](#cellformat-1) | Formatting that is applied to the value to derive the text representation. | [src/models/Cell.ts:30](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L30) |
| <a id="merge"></a> `merge` | `object` | **`Experimental`** Number of cell merges (WRITE ONLY). **Remarks** Due to API limitations, this value is never populated when reading a cell, but it can be set when writing a cell. | [src/models/Cell.ts:37](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L37) |
| `merge.down?` | `number` | - | [src/models/Cell.ts:39](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L39) |
| `merge.right?` | `number` | - | [src/models/Cell.ts:38](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L38) |
| <a id="text"></a> `text` | [`CellText`](#celltext-1) | The text representation of the cell's value. **Remarks** This is often the same as the value, but can differ in cases where the value is a number and the text representation is formatted (e.g., "1,000" vs. 1000), or in the case of the value being a formula. | [src/models/Cell.ts:20](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L20) |
| <a id="value"></a> `value` | [`CellValue`](#cellvalue-1) | The actual value of the cell. | [src/models/Cell.ts:25](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L25) |

***

### CellFormat

> **CellFormat** = `string` & `object`

Defined in: [src/models/Cell.ts:105](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L105)

Format to be applied to a cell value to convert it to text to display to the user.

#### Type declaration

##### \_\_brand

> `readonly` **\_\_brand**: unique `symbol`

#### See

[Cell](#cell) for a more comprehensive representation of a cell, which includes text and formatting.

***

### CellHorizontalAlignment

> **CellHorizontalAlignment** = `"General"` \| `"Left"` \| `"Center"` \| `"Right"` \| `"Fill"` \| `"Justify"` \| `"CenterAcrossSelection"` \| `"Distributed"`

Defined in: [src/models/Cell.ts:135](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L135)

***

### CellScope

> **CellScope** = `object`

Defined in: [src/models/Cell.ts:112](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L112)

The amount of detail that we're reading from a cell.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="alignment-1"></a> `alignment` | `boolean` | Content position with the cell. VERY EXPENSIVE (+1 op per cell) | [src/models/Cell.ts:123](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L123) |
| <a id="border"></a> `border` | `boolean` | Cell borders. VERY EXPENSIVE (+1 op per cell) | [src/models/Cell.ts:126](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L126) |
| <a id="fill-1"></a> `fill` | `boolean` | Background fill style. VERY EXPENSIVE (+1 op per cell) | [src/models/Cell.ts:129](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L129) |
| <a id="font-1"></a> `font` | `boolean` | Text style. VERY EXPENSIVE (+1 op per cell) | [src/models/Cell.ts:132](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L132) |
| <a id="format-1"></a> `format` | `boolean` | Logic used to format values to text. CHEAP (+1 op per 10K cells, no additional call op `values` or `text`) | [src/models/Cell.ts:120](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L120) |
| <a id="text-1"></a> `text` | `boolean` | Formatted value, as presented to the user. CHEAP (+1 op per 10K cells, no additional call op `values` or `format`) | [src/models/Cell.ts:117](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L117) |
| <a id="value-1"></a> `value` | `boolean` | Raw cell value. CHEAP (+1 op per 10K cells, no additional op with `text` or `format`) | [src/models/Cell.ts:114](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L114) |

***

### CellText

> **CellText** = `string`

Defined in: [src/models/Cell.ts:99](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L99)

Text content of a cell in a worksheet.

#### Remarks

This is a string that represents the text displayed in the cell, which may differ from the actual value of the cell (e.g., due to formatting).

***

### CellUnderline

> **CellUnderline** = `"None"` \| `"Single"` \| `"Double"` \| `"SingleAccountant"` \| `"DoubleAccountant"`

Defined in: [src/models/Cell.ts:139](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L139)

***

### CellValue

> **CellValue** = `string` \| `number` \| `boolean`

Defined in: [src/models/Cell.ts:93](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L93)

CellValue represents the value of a cell in a spreadsheet.

#### See

[Cell](#cell) for a more comprehensive representation of a cell, which includes text and formatting.

***

### CellVerticalAlignment

> **CellVerticalAlignment** = `"Top"` \| `"Center"` \| `"Bottom"` \| `"Justify"` \| `"Distributed"`

Defined in: [src/models/Cell.ts:137](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Cell.ts#L137)
