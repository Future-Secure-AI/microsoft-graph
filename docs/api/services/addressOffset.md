[Microsoft Graph SDK](../README.md) / services/addressOffset

## Functions

### columnAddressToOffset()

> **columnAddressToOffset**(`column`): [`ColumnOffset`](../ColumnOffset.md#columnoffset)

Defined in: [src/services/addressOffset.ts:10](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressOffset.ts#L10)

Converts a column address (e.g., "A") to a zero-based column offset.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `column` | [`Uppercase`](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#uppercasestringtype)\<`string`\> | The column address. |

#### Returns

[`ColumnOffset`](../ColumnOffset.md#columnoffset)

The zero-based column offset.

***

### columnOffsetToAddress()

> **columnOffsetToAddress**(`offset`): [`Uppercase`](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#uppercasestringtype)\<`string`\>

Defined in: [src/services/addressOffset.ts:23](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressOffset.ts#L23)

Converts a zero-based column offset to a column address (e.g., "A").

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `offset` | [`ColumnOffset`](../ColumnOffset.md#columnoffset) | The zero-based column offset. |

#### Returns

[`Uppercase`](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#uppercasestringtype)\<`string`\>

The column address.

***

### ~~offsetToColumnAddress()~~

> **offsetToColumnAddress**(`offset`): [`Uppercase`](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#uppercasestringtype)\<`string`\>

Defined in: [src/services/addressOffset.ts:35](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressOffset.ts#L35)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `offset` | [`ColumnOffset`](../ColumnOffset.md#columnoffset) |

#### Returns

[`Uppercase`](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#uppercasestringtype)\<`string`\>

#### Deprecated

Use columnOffsetToAddress instead.

***

### ~~offsetToRowAddress()~~

> **offsetToRowAddress**(`offset`): `` `${number}` ``

Defined in: [src/services/addressOffset.ts:58](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressOffset.ts#L58)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `offset` | [`RowOffset`](../RowOffset.md#rowoffset) |

#### Returns

`` `${number}` ``

#### Deprecated

Use rowOffsetToAddress instead.

***

### rowAddressToOffset()

> **rowAddressToOffset**(`row`): [`RowOffset`](../RowOffset.md#rowoffset)

Defined in: [src/services/addressOffset.ts:44](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressOffset.ts#L44)

Converts a row address (e.g., "1") to a zero-based row offset.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `row` | `` `${number}` `` | The row address. |

#### Returns

[`RowOffset`](../RowOffset.md#rowoffset)

The zero-based row offset.

***

### rowOffsetToAddress()

> **rowOffsetToAddress**(`offset`): `` `${number}` ``

Defined in: [src/services/addressOffset.ts:53](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/addressOffset.ts#L53)

Converts a zero-based row offset to a row address (e.g., "1").

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `offset` | [`RowOffset`](../RowOffset.md#rowoffset) | The zero-based row offset. |

#### Returns

`` `${number}` ``

The row address.
