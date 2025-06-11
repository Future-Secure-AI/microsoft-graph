[Microsoft Graph SDK](README.md) / dataSource

# dataSource

Tooling for easily creating, updating, and deleting items in a worksheet or range.

## Functions

### createItem()

> **createItem**\<`T`\>(`source`, `record`, `after`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Item`](DataSource-1.md#item)\<`T`\>\>

Defined in: [src/services/dataSource.ts:106](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/dataSource.ts#L106)

Creates a new item in the data source.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* [`RecordBase`](DataSource-1.md#recordbase) | Type of the record, extending RecordBase. |

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `source` | [`DataSource`](DataSource-1.md#datasource)\<`T`\> | `undefined` | Data source to insert into. Must be initialized. |
| `record` | `T` | `undefined` | Record to insert. |
| `after` | `null` \| [`ItemIndex`](DataSource-1.md#itemindex-1) | `null` | Index after which to insert the new item. If null, inserts at the end. If -1 inserts at top. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Item`](DataSource-1.md#item)\<`T`\>\>

Newly created item, including its index, row number, and record.

#### Throws

If the data source is not initialized.

#### Throws

If the 'after' index is out of range.

***

### dataSourceFromRange()

> **dataSourceFromRange**\<`T`\>(`rangeRef`, `decode`, `encode`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`DataSource`](DataSource-1.md#datasource)\<`T`\>\>

Defined in: [src/services/dataSource.ts:44](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/dataSource.ts#L44)

Defines a data source from a given range.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* [`RecordBase`](DataSource-1.md#recordbase) | Type of the record, extending RecordBase. |

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](WorkbookRange-1.md#workbookrangeref) | `undefined` | Workbook range reference to define the data source on. |
| `decode` | [`RowDecoder`](DataSource-1.md#rowdecoder)\<`T`\> | `undefined` | Function to decode a row into a record. |
| `encode` | `null` \| [`RowEncoder`](DataSource-1.md#rowencoder)\<`T`\> | `null` | Function to encode a record into a row. Optional. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`DataSource`](DataSource-1.md#datasource)\<`T`\>\>

The initialized data source.

***

### dataSourceFromWorksheet()

> **dataSourceFromWorksheet**\<`T`\>(`worksheetRef`, `decode`, `encode`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`DataSource`](DataSource-1.md#datasource)\<`T`\>\>

Defined in: [src/services/dataSource.ts:32](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/dataSource.ts#L32)

Define a datasource from an entire worksheet.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* [`RecordBase`](DataSource-1.md#recordbase) | Type of the record, extending RecordBase. |

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `worksheetRef` | [`WorkbookRangeRef`](WorkbookRange-1.md#workbookrangeref) | `undefined` | Workbook range reference to define the data source on. |
| `decode` | [`RowDecoder`](DataSource-1.md#rowdecoder)\<`T`\> | `undefined` | Function to decode a row into a record. |
| `encode` | `null` \| [`RowEncoder`](DataSource-1.md#rowencoder)\<`T`\> | `null` | Function to encode a record into a row. Optional. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`DataSource`](DataSource-1.md#datasource)\<`T`\>\>

The initialized data source.

***

### deleteItem()

> **deleteItem**\<`T`\>(`source`, `index`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: [src/services/dataSource.ts:151](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/dataSource.ts#L151)

Deletes an item from the data source at the specified index.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* [`RecordBase`](DataSource-1.md#recordbase) | Type of the record, extending RecordBase. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `source` | [`DataSource`](DataSource-1.md#datasource)\<`T`\> | Data source to delete from. Must be initialized. |
| `index` | [`ItemIndex`](DataSource-1.md#itemindex-1) | Index of the item to delete. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

#### Throws

If the data source is not initialized.

***

### ~~listItems()~~

> **listItems**\<`T`\>(`source`): `AsyncIterable`\<[`Item`](DataSource-1.md#item)\<`T`\>\>

Defined in: [src/services/dataSource.ts:90](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/dataSource.ts#L90)

Reads all items from the data source.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* [`RecordBase`](DataSource-1.md#recordbase) | Type of the record, extending RecordBase. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `source` | [`DataSource`](DataSource-1.md#datasource)\<`T`\> | Data source to read from. |

#### Returns

`AsyncIterable`\<[`Item`](DataSource-1.md#item)\<`T`\>\>

Array of all items in the data source.

#### Deprecated

Iterate on the source directly using `for await (const item of source)`.

***

### updateItem()

> **updateItem**\<`T`\>(`source`, `index`, `record`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: [src/services/dataSource.ts:133](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/dataSource.ts#L133)

Updates an item in the data source at the specified index.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* [`RecordBase`](DataSource-1.md#recordbase) | Type of the record, extending RecordBase. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `source` | [`DataSource`](DataSource-1.md#datasource)\<`T`\> | Data source to update. Must be initialized. |
| `index` | [`ItemIndex`](DataSource-1.md#itemindex-1) | Index of the item to update. |
| `record` | `T` | New record to write at the specified index. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

#### Throws

If the data source is not initialized.

#### Throws

If the index is out of range.
