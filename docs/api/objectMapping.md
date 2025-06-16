[Microsoft Graph SDK](README.md) / objectMapping

# objectMapping

Automated conversion of rows to objects and vice versa based on defined mapping rules.

## Type Aliases

### ObjectMapping\<T\>

> **ObjectMapping**\<`T`\> = `{ [K in keyof T]-?: { columnPattern: RegExp; decode?: (cell: Cell) => T[K]; encode?: (prop: T[K]) => Cell } }`

Defined in: [src/services/objectMapping.ts:16](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/objectMapping.ts#L16)

Defines rules for mapping between spreadsheet rows and object properties.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | Object type to map to/from. |

***

### ResolvedObjectMapping\<T\>

> **ResolvedObjectMapping**\<`T`\> = `{ [K in keyof T]-?: { columnOffset: ColumnOffset; decode: (cell: Cell) => T[K]; encode: (prop: T[K]) => Cell } }`

Defined in: [src/services/objectMapping.ts:50](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/objectMapping.ts#L50)

Resolved mapping from object properties to column offsets and encode/decode functions.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | Object type being mapped. |

## Functions

### createObjectMapping()

> **createObjectMapping**\<`T`\>(`headerRow`, `rules`): [`ResolvedObjectMapping`](#resolvedobjectmapping)\<`T`\>

Defined in: [src/services/objectMapping.ts:86](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/objectMapping.ts#L86)

Creates a mapping from a header row to object properties based on provided rules.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The object type being mapped. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `headerRow` | ([`Cell`](Cell.md#cell) \| [`ColumnName`](Column.md#columnname))[] | The header row, used to determine column offsets. |
| `rules` | [`ObjectMapping`](#objectmapping)\<`T`\> | The mapping rules for converting cells to object properties. |

#### Returns

[`ResolvedObjectMapping`](#resolvedobjectmapping)\<`T`\>

The resolved mapping for use in row/object conversion.

#### Throws

If a column matching a pattern is not found in the header row.

***

### objectsToRows()

> **objectsToRows**\<`T`\>(`objects`, `mapping`): `AsyncIterable`\<[`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`Cell`](Cell.md#cell)\>[]\>

Defined in: [src/services/objectMapping.ts:146](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/objectMapping.ts#L146)

Converts objects to spreadsheet rows using a provided mapping.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The object type to convert. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `objects` | [`Iterable`](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html#iterable-interface)\<`T`, `any`, `any`\> \| `AsyncIterable`\<`T`, `any`, `any`\> | Iterable or async iterable of objects. |
| `mapping` | [`ResolvedObjectMapping`](#resolvedobjectmapping)\<`T`\> | The resolved mapping for object/row conversion. |

#### Returns

`AsyncIterable`\<[`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`Cell`](Cell.md#cell)\>[]\>

#### Yields

Arrays of partial cells, one for each object.

***

### objectToRow()

> **objectToRow**\<`T`\>(`record`, `mapper`): [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`Cell`](Cell.md#cell)\>[]

Defined in: [src/services/objectMapping.ts:184](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/objectMapping.ts#L184)

Converts an object to a row of cells using the provided mapping.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The object type to convert. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `record` | `T` | The object to convert. |
| `mapper` | [`ResolvedObjectMapping`](#resolvedobjectmapping)\<`T`\> | The resolved mapping for object/row conversion. |

#### Returns

[`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`Cell`](Cell.md#cell)\>[]

An array of partial cells representing the row.

***

### rowsToObjects()

> **rowsToObjects**\<`T`\>(`rows`, `mapping`): `AsyncIterable`\<`T`\>

Defined in: [src/services/objectMapping.ts:133](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/objectMapping.ts#L133)

Converts spreadsheet rows to objects using a provided mapping.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The object type to yield. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rows` | [`Iterable`](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html#iterable-interface)\<[`Cell`](Cell.md#cell)[], `any`, `any`\> \| `AsyncIterable`\<[`Cell`](Cell.md#cell)[], `any`, `any`\> | Iterable or async iterable of cell arrays (rows). |
| `mapping` | [`ResolvedObjectMapping`](#resolvedobjectmapping)\<`T`\> | The resolved mapping for row/object conversion. |

#### Returns

`AsyncIterable`\<`T`\>

#### Yields

Objects of type T, one for each row.

***

### rowsToObjectsWithHeader()

> **rowsToObjectsWithHeader**\<`T`\>(`rows`, `rules`): `AsyncIterable`\<`T`\>

Defined in: [src/services/objectMapping.ts:65](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/objectMapping.ts#L65)

Converts spreadsheet rows to objects using the first row as a header.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The object type to yield. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rows` | [`Iterable`](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html#iterable-interface)\<[`Cell`](Cell.md#cell)[], `any`, `any`\> \| `AsyncIterable`\<[`Cell`](Cell.md#cell)[], `any`, `any`\> | Iterable or async iterable of cell arrays (rows). |
| `rules` | [`ObjectMapping`](#objectmapping)\<`T`\> | Mapping rules for converting columns to object properties. |

#### Returns

`AsyncIterable`\<`T`\>

#### Yields

Objects of type T, one for each data row.

***

### rowToObject()

> **rowToObject**\<`T`\>(`cells`, `rules`): `T`

Defined in: [src/services/objectMapping.ts:160](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/objectMapping.ts#L160)

Converts a row of cells to an object using the provided mapping.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The object type to return. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `cells` | [`Cell`](Cell.md#cell)[] | The array of cells representing a row. |
| `rules` | [`ResolvedObjectMapping`](#resolvedobjectmapping)\<`T`\> | The resolved mapping for row/object conversion. |

#### Returns

`T`

The object of type T.

#### Throws

If a required column is missing in the row.
