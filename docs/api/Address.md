[Microsoft Graph SDK](README.md) / Address

# Address

Address of a set of cells in a spreadsheet.

## Type Aliases

### Address

> **Address** = [`ColumnAddress`](#columnaddress) \| [`RowAddress`](#rowaddress) \| [`ColumnRangeAddress`](#columnrangeaddress) \| [`RowRangeAddress`](#rowrangeaddress) \| [`CellRangeAddress`](#cellrangeaddress) \| [`CellAddress`](#celladdress)

Defined in: [src/models/Address.ts:48](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Address.ts#L48)

Any type of address.

#### Remarks

This is a union of all the address types defined above.

#### Example

```ts
'C', 'C:D', '3', '3:5', 'C3', 'C3:D5'
```

***

### CellAddress

> **CellAddress** = `` `${ColumnAddress}${RowAddress}` ``

Defined in: [src/models/Address.ts:35](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Address.ts#L35)

Address of a single cell in a worksheet.

#### Example

```ts
'C3'
```

***

### CellRangeAddress

> **CellRangeAddress** = `` `${CellAddress}:${CellAddress}` ``

Defined in: [src/models/Address.ts:41](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Address.ts#L41)

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

> **ColumnRangeAddress** = `` `${CellAddress}:${CellAddress}` ``

Defined in: [src/models/Address.ts:17](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Address.ts#L17)

Address of multiple consecutive columns in a worksheet ().

#### Example

```ts
'C:D'
```

***

### RowAddress

> **RowAddress** = `` `${number}` ``

Defined in: [src/models/Address.ts:23](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Address.ts#L23)

Address of a single row in a worksheet.

#### Example

```ts
'3'
```

***

### RowRangeAddress

> **RowRangeAddress** = `` `${RowAddress}:${RowAddress}` ``

Defined in: [src/models/Address.ts:29](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Address.ts#L29)

Address of multiple consecutive rows in a worksheet.

#### Example

```ts
'3:5'
```
