[Microsoft Graph SDK](README.md) / WorkbookTable

# WorkbookTable

Pointer for a table in a worksheet.

## Type Aliases

### WorkbookTableColumnRef

> **WorkbookTableColumnRef** = [`WorkbookTableRef`](#workbooktableref) & `object`

Defined in: [src/models/WorkbookTable.ts:27](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/WorkbookTable.ts#L27)

Reference to a column in a table in a worksheet.

#### Type declaration

##### column

> **column**: [`ColumnName`](Column.md#columnname)

***

### WorkbookTableId

> **WorkbookTableId** = `string` & `object`

Defined in: [src/models/WorkbookTable.ts:13](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/WorkbookTable.ts#L13)

Identifier for a table in a worksheet.

#### Type declaration

##### \_\_brand

> `readonly` **\_\_brand**: unique `symbol`

***

### WorkbookTableRef

> **WorkbookTableRef** = [`WorkbookWorksheetRef`](WorkbookWorksheet-1.md#workbookworksheetref) & `object`

Defined in: [src/models/WorkbookTable.ts:20](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/WorkbookTable.ts#L20)

Reference to a table in a worksheet.

#### Type declaration

##### tableId

> **tableId**: [`WorkbookTableId`](#workbooktableid)
