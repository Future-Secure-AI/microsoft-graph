[Microsoft Graph SDK](README.md) / addressOffset

Utilities for converting between spreadsheet column/row addresses and offsets.

## Functions

### columnAddressToOffset()

> **columnAddressToOffset**(`column`): [`ColumnOffset`](ColumnOffset.md#columnoffset)

Defined in: [src/services/addressOffset.ts:16](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressOffset.ts#L16)

Converts a column address (e.g., "A") to a zero-based column offset.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `column` | [`Uppercase`](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#uppercasestringtype)\<`string`\> | The column address. |

#### Returns

[`ColumnOffset`](ColumnOffset.md#columnoffset)

The zero-based column offset.

***

### columnOffsetToAddress()

> **columnOffsetToAddress**(`offset`): [`Uppercase`](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#uppercasestringtype)\<`string`\>

Defined in: [src/services/addressOffset.ts:29](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressOffset.ts#L29)

Converts a zero-based column offset to a column address (e.g., "A").

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `offset` | [`ColumnOffset`](ColumnOffset.md#columnoffset) | The zero-based column offset. |

#### Returns

[`Uppercase`](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#uppercasestringtype)\<`string`\>

The column address.

***

### ~~offsetToColumnAddress()~~

> **offsetToColumnAddress**(`offset`): [`Uppercase`](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#uppercasestringtype)\<`string`\>

Defined in: [src/services/addressOffset.ts:41](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressOffset.ts#L41)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `offset` | [`ColumnOffset`](ColumnOffset.md#columnoffset) |

#### Returns

[`Uppercase`](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#uppercasestringtype)\<`string`\>

#### Deprecated

Use columnOffsetToAddress instead.

***

### ~~offsetToRowAddress()~~

> **offsetToRowAddress**(`offset`): `` `${number}` ``

Defined in: [src/services/addressOffset.ts:64](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressOffset.ts#L64)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `offset` | [`RowOffset`](RowOffset.md#rowoffset) |

#### Returns

`` `${number}` ``

#### Deprecated

Use rowOffsetToAddress instead.

***

### rowAddressToOffset()

> **rowAddressToOffset**(`row`): [`RowOffset`](RowOffset.md#rowoffset)

Defined in: [src/services/addressOffset.ts:50](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressOffset.ts#L50)

Converts a row address (e.g., "1") to a zero-based row offset.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `row` | `` `${number}` `` | The row address. |

#### Returns

[`RowOffset`](RowOffset.md#rowoffset)

The zero-based row offset.

***

### rowOffsetToAddress()

> **rowOffsetToAddress**(`offset`): `` `${number}` ``

Defined in: [src/services/addressOffset.ts:59](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressOffset.ts#L59)

Converts a zero-based row offset to a row address (e.g., "1").

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `offset` | [`RowOffset`](RowOffset.md#rowoffset) | The zero-based row offset. |

#### Returns

`` `${number}` ``

The row address.
