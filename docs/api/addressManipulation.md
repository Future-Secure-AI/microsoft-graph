[Microsoft Graph SDK](README.md) / addressManipulation

# addressManipulation

Utilities for manipulating and analyzing spreadsheet-style addresses (A1 notation).

## Type Aliases

### AddressComponents

> **AddressComponents** = `object`

Defined in: [src/services/addressManipulation.ts:35](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L35)

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="endcolumn"></a> `endColumn` | [`ColumnAddress`](Address.md#columnaddress) | [src/services/addressManipulation.ts:37](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L37) |
| <a id="endrow"></a> `endRow` | [`RowAddress`](Address.md#rowaddress) | [src/services/addressManipulation.ts:39](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L39) |
| <a id="startcolumn"></a> `startColumn` | [`ColumnAddress`](Address.md#columnaddress) | [src/services/addressManipulation.ts:36](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L36) |
| <a id="startrow"></a> `startRow` | [`RowAddress`](Address.md#rowaddress) | [src/services/addressManipulation.ts:38](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L38) |

## Functions

### cellToRangeAddress()

> **cellToRangeAddress**(`cell`, `rows`, `cols`): [`Address`](Address.md#address)

Defined in: [src/services/addressManipulation.ts:347](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L347)

Creates a range from a single cell address, extending by the specified number of rows and columns.
If rows/cols is positive, the cell is the start of the range; if negative, the cell is the end of the range.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `cell` | `` `${Uppercase<string>}${number}` `` | The cell address to use as the anchor. |
| `rows` | `number` | Number of rows for the range. Positive: cell is start; Negative: cell is end. |
| `cols` | `number` | Number of columns for the range. Positive: cell is start; Negative: cell is end. |

#### Returns

[`Address`](Address.md#address)

The created address range.

#### Throws

If the resulting address is out of bounds.

#### Example

```ts
// Creates a 2x2 range starting at B2
cellToRangeAddress("B2", 2, 2); // "B2:C3"
// Creates a 2x2 range ending at B2
cellToRangeAddress("B2", -2, -2); // "A1:B2"
// Creates a 2x2 range starting at C3, extending 2 rows down and 2 columns left
cellToRangeAddress("B2", 2, -2)).toBe("A2:B3")
```

***

### composeAddress()

> **composeAddress**(`components`, `forceRange`): [`Address`](Address.md#address)

Defined in: [src/services/addressManipulation.ts:81](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L81)

Composes an address from its components.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `components` | [`AddressComponents`](#addresscomponents) | `undefined` | The address components. |
| `forceRange` | `boolean` | `false` | If true, forces the address to be a range even if it represents a single cell or row/column. Used to workaround API quirks |

#### Returns

[`Address`](Address.md#address)

The composed address.

#### Throws

InvalidArgumentError if the components are invalid.

***

### countAddressColumns()

> **countAddressColumns**(`address`): `number`

Defined in: [src/services/addressManipulation.ts:323](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L323)

Counts the number of columns in a given address.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `address` | [`Address`](Address.md#address) | The address to analyze. |

#### Returns

`number`

The number of columns in the address.

***

### countAddressRows()

> **countAddressRows**(`address`): `number`

Defined in: [src/services/addressManipulation.ts:313](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L313)

Counts the number of rows in a given address.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `address` | [`Address`](Address.md#address) | The address to analyze. |

#### Returns

`number`

The number of rows in the address.

***

### decomposeAddress()

> **decomposeAddress**(`address`): [`AddressComponents`](#addresscomponents)

Defined in: [src/services/addressManipulation.ts:58](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L58)

Decomposes an address into its components (start and end columns/rows).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `address` | [`Address`](Address.md#address) | The address to decompose. |

#### Returns

[`AddressComponents`](#addresscomponents)

The decomposed address components.

#### Throws

InvalidArgumentError if the address format is invalid.

***

### decrementRowAddress()

> **decrementRowAddress**(`address`): [`Address`](Address.md#address)

Defined in: [src/services/addressManipulation.ts:251](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L251)

Decrements the row address by one.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `address` | [`Address`](Address.md#address) | The address to decrement. |

#### Returns

[`Address`](Address.md#address)

The decremented address.

***

### getFirstCellAddress()

> **getFirstCellAddress**(`address`): `` `${Uppercase<string>}${number}` ``

Defined in: [src/services/addressManipulation.ts:110](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L110)

Gets the first cell address from a given address.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `address` | [`Address`](Address.md#address) | The address to analyze. |

#### Returns

`` `${Uppercase<string>}${number}` ``

The first cell address.

***

### getFirstColumnAddress()

> **getFirstColumnAddress**(`address`): [`Address`](Address.md#address)

Defined in: [src/services/addressManipulation.ts:162](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L162)

Gets the first column address from a given address.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `address` | [`Address`](Address.md#address) | The address to analyze. |

#### Returns

[`Address`](Address.md#address)

The first column address.

***

### getFirstRowAddress()

> **getFirstRowAddress**(`address`): [`Address`](Address.md#address)

Defined in: [src/services/addressManipulation.ts:130](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L130)

Gets the first row address from a given address.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `address` | [`Address`](Address.md#address) | The address to analyze. |

#### Returns

[`Address`](Address.md#address)

The first row address.

***

### getLastCellAddress()

> **getLastCellAddress**(`address`): `` `${Uppercase<string>}${number}` ``

Defined in: [src/services/addressManipulation.ts:120](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L120)

Gets the last cell address from a given address.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `address` | [`Address`](Address.md#address) | The address to analyze. |

#### Returns

`` `${Uppercase<string>}${number}` ``

The last cell address.

***

### getLastColumnAddress()

> **getLastColumnAddress**(`address`): [`Address`](Address.md#address)

Defined in: [src/services/addressManipulation.ts:178](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L178)

Gets the last column address from a given address.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `address` | [`Address`](Address.md#address) | The address to analyze. |

#### Returns

[`Address`](Address.md#address)

The last column address.

***

### getLastRowAddress()

> **getLastRowAddress**(`address`): [`Address`](Address.md#address)

Defined in: [src/services/addressManipulation.ts:146](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L146)

Gets the last row address from a given address.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `address` | [`Address`](Address.md#address) | The address to analyze. |

#### Returns

[`Address`](Address.md#address)

The last row address.

***

### incrementRowAddress()

> **incrementRowAddress**(`address`): [`Address`](Address.md#address)

Defined in: [src/services/addressManipulation.ts:242](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L242)

Increments the row address by one.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `address` | [`Address`](Address.md#address) | The address to increment. |

#### Returns

[`Address`](Address.md#address)

The incremented address.

***

### isAddressOverlapping()

> **isAddressOverlapping**(`address1`, `address2`): `boolean`

Defined in: [src/services/addressManipulation.ts:261](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L261)

Checks if two addresses overlap.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `address1` | [`Address`](Address.md#address) | The first address. |
| `address2` | [`Address`](Address.md#address) | The second address. |

#### Returns

`boolean`

True if the addresses overlap, otherwise false.

***

### isAllColumnsAddress()

> **isAllColumnsAddress**(`address`): `boolean`

Defined in: [src/services/addressManipulation.ts:293](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L293)

Checks if the address components represent all columns.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `address` | [`Address`](Address.md#address) | The address to check. |

#### Returns

`boolean`

True if the components represent all columns, otherwise false.

***

### isAllRowsAddress()

> **isAllRowsAddress**(`address`): `boolean`

Defined in: [src/services/addressManipulation.ts:303](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L303)

Checks if the address components represent all rows.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `address` | [`Address`](Address.md#address) | The address to check. |

#### Returns

`boolean`

True if the components represent all rows, otherwise false.

***

### isSingleColumnAddress()

> **isSingleColumnAddress**(`address`): `boolean`

Defined in: [src/services/addressManipulation.ts:283](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L283)

Checks if the address components represent a single column.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `address` | [`Address`](Address.md#address) | The address to check. |

#### Returns

`boolean`

True if the components represent single columns, otherwise false.

***

### isSingleRowAddress()

> **isSingleRowAddress**(`address`): `boolean`

Defined in: [src/services/addressManipulation.ts:273](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L273)

Checks if the address components represent a single row.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `address` | [`Address`](Address.md#address) | The address to check. |

#### Returns

`boolean`

True if the components represent a single riw, otherwise false.

***

### normalizeAddress()

> **normalizeAddress**(`address`, `forceRange`): [`Address`](Address.md#address)

Defined in: [src/services/addressManipulation.ts:48](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L48)

Fixes address, removing an optional sheet prefix and ensuring it is a valid range.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `address` | [`Address`](Address.md#address) | `undefined` | The address to normalize. |
| `forceRange` | `boolean` | `false` | If true, forces the address to be a range even if it represents a single cell or row/column. This is useful to workaround API quirks. |

#### Returns

[`Address`](Address.md#address)

***

### offsetAddress()

> **offsetAddress**(`address`, `columnOffset`, `rowOffset`): [`Address`](Address.md#address)

Defined in: [src/services/addressManipulation.ts:198](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L198)

Offsets an address by the specified column and row offsets.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `address` | [`Address`](Address.md#address) | The address to offset. |
| `columnOffset` | `number` | The column offset. |
| `rowOffset` | `number` | The row offset. |

#### Returns

[`Address`](Address.md#address)

The offset address.

#### Throws

UnsupportedAddressTypeError if the address cannot be offset.

#### Throws

InvalidArgumentError if the offset is out of bounds.

***

### subAddress()

> **subAddress**(`address`, `skipRows`, `takeRows`, `skipCols`, `takeCols`): [`Address`](Address.md#address)

Defined in: [src/services/addressManipulation.ts:408](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L408)

Extracts a sub-address from a spreadsheet-style A1 range (e.g., "A1:D10"),
allowing skip and take semantics on both rows and columns.

Supports negative values for `skipRows` and `skipCols` to count from the end.
Supports negative values for `takeRows` and `takeCols` to exclude from the end after skipping.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `address` | [`Address`](Address.md#address) | `undefined` | The original range in A1 notation (e.g., "A1:D10"). |
| `skipRows` | `number` | `0` | Number of rows to skip. If negative, skips that many rows from the end. Default is 0. |
| `takeRows` | `number` | `Number.POSITIVE_INFINITY` | Number of rows to take after skipping. If negative, excludes that many rows from the end of the remaining rows. Default is Infinity. |
| `skipCols` | `number` | `0` | Number of columns to skip. If negative, skips that many columns from the end. Default is 0. |
| `takeCols` | `number` | `Number.POSITIVE_INFINITY` | Number of columns to take after skipping. If negative, excludes that many columns from the end of the remaining columns. Default is Infinity. |

#### Returns

[`Address`](Address.md#address)

A new A1-style range representing the sliced subrange (e.g., "B2:C5").

#### Example

```ts
subaddress("A1:D10", -1, 1); // Last row: "A10:D10"
subaddress("A1:D10", -2, 1); // Second last row: "A9:D9"
subaddress("A1:D10", 0, -1); // All but last row: "A1:D9"
subaddress("A1:D10", 0, Infinity, -2, 1); // Second last column: "C1:C10"
```

***

### subRange()

> **subRange**(`rangeRef`, `skipRows`, `takeRows`, `skipCols`, `takeCols`): [`WorkbookRangeRef`](WorkbookRangeRef.md#workbookrangeref)

Defined in: [src/services/addressManipulation.ts:457](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L457)

Extracts a sub-range from a WorkbookRangeRef using skip/take semantics.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](WorkbookRangeRef.md#workbookrangeref) | `undefined` | Range reference to extract the sub-range from. |
| `skipRows` | `number` | `0` | Number of rows to skip. If negative, skips from the end. Default 0. |
| `takeRows` | `number` | `Number.POSITIVE_INFINITY` | Number of rows to take after skipping. If negative, excludes from the end. Default Infinity. |
| `skipCols` | `number` | `0` | Number of columns to skip. If negative, skips from the end. Default 0. |
| `takeCols` | `number` | `Number.POSITIVE_INFINITY` | Number of columns to take after skipping. If negative, excludes from the end. Default Infinity. |

#### Returns

[`WorkbookRangeRef`](WorkbookRangeRef.md#workbookrangeref)

Extracted sub-range reference.

#### Throws

InvalidArgumentError if the requested rows or columns exceed the available range.
