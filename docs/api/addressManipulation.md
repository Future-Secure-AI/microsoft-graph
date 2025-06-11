[Microsoft Graph SDK](README.md) / addressManipulation

# addressManipulation

Utilities for manipulating and analyzing spreadsheet-style addresses (A1 notation).

## Functions

### cellToRangeAddress()

> **cellToRangeAddress**(`cell`, `rows`, `cols`): [`Address`](Address.md#address)

Defined in: [src/services/addressManipulation.ts:340](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L340)

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

Defined in: [src/services/addressManipulation.ts:74](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L74)

Composes an address from its components.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `components` | [`DecomposedAddress`](Address.md#decomposedaddress) | `undefined` | The address components. |
| `forceRange` | `boolean` | `false` | If true, forces the address to be a range even if it represents a single cell or row/column. Used to workaround API quirks |

#### Returns

[`Address`](Address.md#address)

The composed address.

#### Throws

InvalidArgumentError if the components are invalid.

***

### countAddressColumns()

> **countAddressColumns**(`address`): `number`

Defined in: [src/services/addressManipulation.ts:316](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L316)

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

Defined in: [src/services/addressManipulation.ts:306](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L306)

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

> **decomposeAddress**(`address`): [`DecomposedAddress`](Address.md#decomposedaddress)

Defined in: [src/services/addressManipulation.ts:51](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L51)

Decomposes an address into its components (start and end columns/rows).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `address` | [`Address`](Address.md#address) | The address to decompose. |

#### Returns

[`DecomposedAddress`](Address.md#decomposedaddress)

The decomposed address components.

#### Throws

InvalidArgumentError if the address format is invalid.

***

### decrementRowAddress()

> **decrementRowAddress**(`address`): [`Address`](Address.md#address)

Defined in: [src/services/addressManipulation.ts:244](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L244)

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

Defined in: [src/services/addressManipulation.ts:103](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L103)

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

Defined in: [src/services/addressManipulation.ts:155](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L155)

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

Defined in: [src/services/addressManipulation.ts:123](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L123)

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

Defined in: [src/services/addressManipulation.ts:113](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L113)

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

Defined in: [src/services/addressManipulation.ts:171](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L171)

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

Defined in: [src/services/addressManipulation.ts:139](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L139)

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

Defined in: [src/services/addressManipulation.ts:235](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L235)

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

Defined in: [src/services/addressManipulation.ts:254](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L254)

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

Defined in: [src/services/addressManipulation.ts:286](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L286)

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

Defined in: [src/services/addressManipulation.ts:296](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L296)

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

Defined in: [src/services/addressManipulation.ts:276](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L276)

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

Defined in: [src/services/addressManipulation.ts:266](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L266)

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

Defined in: [src/services/addressManipulation.ts:41](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L41)

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

Defined in: [src/services/addressManipulation.ts:191](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L191)

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

Defined in: [src/services/addressManipulation.ts:401](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L401)

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

> **subRange**(`rangeRef`, `skipRows`, `takeRows`, `skipCols`, `takeCols`): [`WorkbookRangeRef`](WorkbookRange-1.md#workbookrangeref)

Defined in: [src/services/addressManipulation.ts:494](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L494)

Extracts a sub-range from a WorkbookRangeRef using skip/take semantics.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](WorkbookRange-1.md#workbookrangeref) | `undefined` | Range reference to extract the sub-range from. |
| `skipRows` | `number` | `0` | Number of rows to skip. If negative, skips from the end. Default 0. |
| `takeRows` | `number` | `Number.POSITIVE_INFINITY` | Number of rows to take after skipping. If negative, excludes from the end. Default Infinity. |
| `skipCols` | `number` | `0` | Number of columns to skip. If negative, skips from the end. Default 0. |
| `takeCols` | `number` | `Number.POSITIVE_INFINITY` | Number of columns to take after skipping. If negative, excludes from the end. Default Infinity. |

#### Returns

[`WorkbookRangeRef`](WorkbookRange-1.md#workbookrangeref)

Extracted sub-range reference.

#### Throws

InvalidArgumentError if the requested rows or columns exceed the available range.

***

### superAddress()

> **superAddress**(`address`, `skipRows`, `takeRows`, `skipCols`, `takeCols`): [`Address`](Address.md#address)

Defined in: [src/services/addressManipulation.ts:455](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L455)

Returns a super-address that extends the given address by skipping/taking rows/columns, possibly outside the original bounds.
Negative skip moves the start above/left of the original range (not from the end).

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `address` | [`Address`](Address.md#address) | `undefined` | The original range in A1 notation (e.g., "A1:D10"). |
| `skipRows` | `number` | `0` | Number of rows to skip (can be negative to extend above). |
| `takeRows` | `number` | `Number.POSITIVE_INFINITY` | Number of rows to take after skipping. If negative, excludes from the end. Default is Infinity. |
| `skipCols` | `number` | `0` | Number of columns to skip (can be negative to extend left). |
| `takeCols` | `number` | `Number.POSITIVE_INFINITY` | Number of columns to take after skipping. If negative, excludes from the end. Default is Infinity. |

#### Returns

[`Address`](Address.md#address)

A new A1-style range representing the superrange (may extend outside original bounds).

#### Example

```ts
superAddress("B2:C3", -1, 4, -1, 4) // "A1:D5"
```

***

### superRange()

> **superRange**(`rangeRef`, `skipRows`, `takeRows`, `skipCols`, `takeCols`): [`WorkbookRangeRef`](WorkbookRange-1.md#workbookrangeref)

Defined in: [src/services/addressManipulation.ts:513](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressManipulation.ts#L513)

Returns a super-range from a WorkbookRangeRef using skip/take semantics, possibly extending outside the original bounds.
Negative skip moves the start above/left of the original range (not from the end).

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](WorkbookRange-1.md#workbookrangeref) | `undefined` | Range reference to extend. |
| `skipRows` | `number` | `0` | Number of rows to skip (can be negative to extend above). Default 0. |
| `takeRows` | `number` | `Number.POSITIVE_INFINITY` | Number of rows to take after skipping. If negative, excludes from the end. Default Infinity. |
| `skipCols` | `number` | `0` | Number of columns to skip (can be negative to extend left). Default 0. |
| `takeCols` | `number` | `Number.POSITIVE_INFINITY` | Number of columns to take after skipping. If negative, excludes from the end. Default Infinity. |

#### Returns

[`WorkbookRangeRef`](WorkbookRange-1.md#workbookrangeref)

Extended super-range reference.
