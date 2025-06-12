[Microsoft Graph SDK](README.md) / DataSource

# DataSource

**`Experimental`**

Tooling for easily creating, updating, and deleting items in a worksheet or range.

## Type Aliases

### DataSource\<T\>

> **DataSource**\<`T`\> = `object` & `AsyncIterable`\<[`Item`](#item)\<`T`\>\>

Defined in: [src/models/DataSource.ts:17](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/DataSource.ts#L17)

**`Experimental`**

Defines a data source for a worksheet or range.

#### Type declaration

##### bodyOffset

> **bodyOffset**: [`RowOffset`](Row.md#rowoffset)

##### bodyRef

> **bodyRef**: [`WorkbookRangeRef`](WorkbookRange-1.md#workbookrangeref)

##### coding

> **coding**: `object`

###### coding.decode

> **decode**: [`RowDecoder`](#rowdecoder)\<`T`\>

###### coding.encode

> **encode**: [`RowEncoder`](#rowencoder)\<`T`\> \| `null`

##### head

> **head**: [`ColumnName`](Column.md#columnname)[]

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* [`RecordBase`](#recordbase) | Type of the record, extending RecordBase. |

***

### DataSourceRow

> **DataSourceRow** = [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<[`ColumnName`](Column.md#columnname), [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`Cell`](Cell.md#cell)\>\>

Defined in: [src/models/DataSource.ts:55](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/DataSource.ts#L55)

**`Experimental`**

***

### Item\<T\>

> **Item**\<`T`\> = `object`

Defined in: [src/models/DataSource.ts:47](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/DataSource.ts#L47)

**`Experimental`**

Item within a data source.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* [`RecordBase`](#recordbase) |

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="index"></a> `index` | [`ItemIndex`](#itemindex-1) | [src/models/DataSource.ts:48](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/DataSource.ts#L48) |
| <a id="record"></a> `record` | `T` | [src/models/DataSource.ts:50](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/DataSource.ts#L50) |
| <a id="rownumber"></a> `rowNumber` | [`RowNumber`](Row.md#rownumber) | [src/models/DataSource.ts:49](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/DataSource.ts#L49) |

***

### ItemIndex

> **ItemIndex** = `number` & `object`

Defined in: [src/models/DataSource.ts:40](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/DataSource.ts#L40)

**`Experimental`**

Item's position within a data source.

#### Type declaration

##### \_\_brand

> **\_\_brand**: `"ItemIndex"`

***

### RangeOperationCallback()

> **RangeOperationCallback** = (`rangeRef`) => [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: [src/models/DataSource.ts:56](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/DataSource.ts#L56)

**`Experimental`**

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](WorkbookRange-1.md#workbookrangeref) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

***

### RecordBase

> **RecordBase** = [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, [`CellValue`](Cell.md#cellvalue-1)\>

Defined in: [src/models/DataSource.ts:54](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/DataSource.ts#L54)

**`Experimental`**

***

### RowDecoder()\<T\>

> **RowDecoder**\<`T`\> = (`row`) => `T`

Defined in: [src/models/DataSource.ts:30](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/DataSource.ts#L30)

**`Experimental`**

Method to decode row into a record.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* [`RecordBase`](#recordbase) |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `row` | [`DataSourceRow`](#datasourcerow) |

#### Returns

`T`

***

### RowEncoder()\<T\>

> **RowEncoder**\<`T`\> = (`record`) => [`DataSourceRow`](#datasourcerow)

Defined in: [src/models/DataSource.ts:35](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/DataSource.ts#L35)

**`Experimental`**

Method to encode a record into a row.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* [`RecordBase`](#recordbase) |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `record` | `T` |

#### Returns

[`DataSourceRow`](#datasourcerow)
