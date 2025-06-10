[Microsoft Graph SDK](README.md) / workbookTableColumn

# workbookTableColumn

Utilities for creating and working with workbook table column references.

## Functions

### createWorkbookTableColumnRef()

> **createWorkbookTableColumnRef**(`tableRef`, `column`): [`WorkbookTableColumnRef`](WorkbookTable-1.md#workbooktablecolumnref)

Defined in: [src/services/workbookTableColumn.ts:17](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/workbookTableColumn.ts#L17)

Creates a reference to a workbook table column.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tableRef` | [`WorkbookTableRef`](WorkbookTable-1.md#workbooktableref) | The reference to the worksheet containing the table. |
| `column` | `undefined` \| `string` \| [`ColumnName`](Column.md#columnname) | Name of the table column |

#### Returns

[`WorkbookTableColumnRef`](WorkbookTable-1.md#workbooktablecolumnref)

A reference to the workbook table.

#### Throws

Error if the table ID is missing.
