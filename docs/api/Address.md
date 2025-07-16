[Microsoft Graph SDK](README.md) / Address

# Address

Address of a set of cells in a spreadsheet.

## Type Aliases

### Address

> **Address** = [`ColumnAddress`](#columnaddress) \| [`ColumnRangeAddress`](#columnrangeaddress) \| [`RowAddress`](#rowaddress) \| [`RowRangeAddress`](#rowrangeaddress) \| [`CellAddress`](#celladdress) \| [`CellRangeAddress`](#cellrangeaddress)

Defined in: [src/models/Address.ts:75](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Address.ts#L75)

Any type of address.

#### Remarks

This is a union of all the address types defined above.

#### Example

```ts
'C', 'C:D', '3', '3:5', 'C3', 'C3:D5'
```

***

### AllUsedAddress

> **AllUsedAddress** = `":"`

Defined in: [src/models/Address.ts:68](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Address.ts#L68)

Address representing the entire used range in a worksheet.

#### Example

```ts
':'
```

***

### CellAddress

> **CellAddress** = `` `${ColumnAddress}${RowAddress}` ``

Defined in: [src/models/Address.ts:49](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Address.ts#L49)

Address of a single cell in a worksheet.

#### Example

```ts
'C3'
```

***

### CellRangeAddress

> **CellRangeAddress** = `` `${CellAddress}:${CellAddress}` ``

Defined in: [src/models/Address.ts:55](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Address.ts#L55)

Address of a range of cells in a worksheet.

#### Example

```ts
'C3:D5'
```

***

### ColumnAddress

> **ColumnAddress** = `` `${Uppercase<string>}` ``

Defined in: [src/models/Address.ts:11](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Address.ts#L11)

Address of a single column in a worksheet.

#### Example

```ts
'C'
```

***

### ColumnRangeAddress

> **ColumnRangeAddress** = `` `${ColumnAddress}:${ColumnAddress}` ``

Defined in: [src/models/Address.ts:17](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Address.ts#L17)

Address of multiple consecutive columns in a worksheet ().

#### Example

```ts
'C:D'
```

***

### DecomposedAddress

> **DecomposedAddress** = `object`

Defined in: [src/models/Address.ts:89](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Address.ts#L89)

Address when decomposed into its components.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="endcolumn"></a> `endColumn` | [`ColumnAddress`](#columnaddress) | The ending column address. | [src/models/Address.ts:91](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Address.ts#L91) |
| <a id="endrow"></a> `endRow` | [`RowAddress`](#rowaddress) | The ending row address. | [src/models/Address.ts:93](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Address.ts#L93) |
| <a id="startcolumn"></a> `startColumn` | [`ColumnAddress`](#columnaddress) | The starting column address. | [src/models/Address.ts:90](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Address.ts#L90) |
| <a id="startrow"></a> `startRow` | [`RowAddress`](#rowaddress) | The starting row address. | [src/models/Address.ts:92](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Address.ts#L92) |

***

### RowAddress

> **RowAddress** = `` `${number}` ``

Defined in: [src/models/Address.ts:30](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Address.ts#L30)

Address of a single row in a worksheet.

#### Example

```ts
'3'
```

***

### RowRangeAddress

> **RowRangeAddress** = `` `${RowAddress}:${RowAddress}` ``

Defined in: [src/models/Address.ts:36](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Address.ts#L36)

Address of multiple consecutive rows in a worksheet.

#### Example

```ts
'3:5'
```

***

### UsedAddress

> **UsedAddress** = [`AllUsedAddress`](#allusedaddress) \| [`UsedColumnRangeAddress`](#usedcolumnrangeaddress) \| [`UsedRowRangeAddress`](#usedrowrangeaddress) \| [`UsedCellRangeAddress`](#usedcellrangeaddress)

Defined in: [src/models/Address.ts:80](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Address.ts#L80)

Any type of used range address, including entire, column, row, or cell used ranges.

***

### UsedCellRangeAddress

> **UsedCellRangeAddress** = `` `${CellAddress}:` `` \| `` `:${CellAddress}` ``

Defined in: [src/models/Address.ts:62](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Address.ts#L62)

Address of a used range in a cell, either from the start or to the end.

#### Examples

```ts
'C3:'
```

```ts
':D5'
```

***

### UsedColumnRangeAddress

> **UsedColumnRangeAddress** = `` `${ColumnAddress}:` `` \| `` `:${ColumnAddress}` ``

Defined in: [src/models/Address.ts:24](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Address.ts#L24)

Address of a used range in a column, either from the start or to the end.

#### Examples

```ts
'C:'
```

```ts
':D'
```

***

### UsedRowRangeAddress

> **UsedRowRangeAddress** = `` `${RowAddress}:` `` \| `` `:${RowAddress}` ``

Defined in: [src/models/Address.ts:43](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Address.ts#L43)

Address of a used range in a row, either from the start or to the end.

#### Examples

```ts
'3:'
```

```ts
':5'
```
