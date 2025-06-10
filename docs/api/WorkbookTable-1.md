[Microsoft Graph SDK](README.md) / WorkbookTable

# WorkbookTable

Pointer for a table in a worksheet.

## Type Aliases

### WorkbookTableColumnRef

> **WorkbookTableColumnRef** = [`WorkbookTableRef`](#workbooktableref) & `object`

Defined in: src/models/WorkbookTable.ts:29

Reference to a column in a table in a worksheet.

#### Type declaration

##### column

> **column**: [`ColumnName`](Column.md#columnname)

***

### WorkbookTableId

> **WorkbookTableId** = `string` & `object`

Defined in: src/models/WorkbookTable.ts:15

Identifier for a table in a worksheet.

#### Type declaration

##### \_\_brand

> **\_\_brand**: `"WorkbookTableId"`

***

### WorkbookTableRef

> **WorkbookTableRef** = [`WorkbookWorksheetRef`](WorkbookWorksheet-1.md#workbookworksheetref) & `object`

Defined in: src/models/WorkbookTable.ts:22

Reference to a table in a worksheet.

#### Type declaration

##### tableId

> **tableId**: [`WorkbookTableId`](#workbooktableid)
