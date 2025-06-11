[Microsoft Graph SDK](../README.md) / models/DataSource

# models/DataSource

## Type Aliases

### DataSource\<T\>

> **DataSource**\<`T`\> = `object` & `AsyncIterable`\<[`Item`](#item)\<`T`\>\>

Defined in: src/models/DataSource.ts:6

#### Type declaration

##### bodyOffset

> **bodyOffset**: [`RowOffset`](../Row.md#rowoffset)

##### bodyRef

> **bodyRef**: [`WorkbookRangeRef`](../WorkbookRange-1.md#workbookrangeref)

##### coding

> **coding**: `object`

###### coding.decode

> **decode**: [`RowDecoder`](#rowdecoder)\<`T`\>

###### coding.encode

> **encode**: [`RowEncoder`](#rowencoder)\<`T`\> \| `null`

##### head

> **head**: [`ColumnName`](../Column.md#columnname)[]

#### Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* [`RecordBase`](#recordbase) |

***

### DataSourceRow

> **DataSourceRow** = [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<[`ColumnName`](../Column.md#columnname), [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`Cell`](../Cell.md#cell)\>\>

Defined in: src/models/DataSource.ts:30

***

### Item\<T\>

> **Item**\<`T`\> = `object`

Defined in: src/models/DataSource.ts:23

#### Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* [`RecordBase`](#recordbase) |

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="index"></a> `index` | [`ItemIndex`](#itemindex-1) | src/models/DataSource.ts:24 |
| <a id="record"></a> `record` | `T` | src/models/DataSource.ts:26 |
| <a id="rownumber"></a> `rowNumber` | [`RowNumber`](../Row.md#rownumber) | src/models/DataSource.ts:25 |

***

### ItemIndex

> **ItemIndex** = `number` & `object`

Defined in: src/models/DataSource.ts:19

#### Type declaration

##### \_\_brand

> **\_\_brand**: `"ItemIndex"`

***

### RangeOperationCallback()

> **RangeOperationCallback** = (`rangeRef`) => [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: src/models/DataSource.ts:31

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](../WorkbookRange-1.md#workbookrangeref) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

***

### RecordBase

> **RecordBase** = [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, [`CellValue`](../Cell.md#cellvalue-1)\>

Defined in: src/models/DataSource.ts:29

***

### RowDecoder()\<T\>

> **RowDecoder**\<`T`\> = (`row`) => `T`

Defined in: src/models/DataSource.ts:16

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

Defined in: src/models/DataSource.ts:17

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
