[Microsoft Graph SDK](../README.md) / models/DataSource

## Type Aliases

### DataSource\<T\>

> **DataSource**\<`T`\> = `object` & `AsyncIterable`\<[`Item`](Item.md#item)\<`T`\>\>

Defined in: [src/models/DataSource.ts:8](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/DataSource.ts#L8)

#### Type declaration

##### coding

> **coding**: `object`

###### coding.decode

> **decode**: [`DataSourceDecoder`](DataSourceDecoder.md#datasourcedecoder)\<`T`\>

###### coding.encode

> **encode**: [`DataSourceEncoder`](DataSourceEncoder.md#datasourceencoder)\<`T`\> \| `null`

##### head

> **head**: [`ColumnName`](ColumnName.md#columnname)[]

##### rangeRef

> **rangeRef**: [`WorkbookRangeRef`](WorkbookRangeRef.md#workbookrangeref)

#### Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* [`RecordBase`](RecordBase.md#recordbase) |
