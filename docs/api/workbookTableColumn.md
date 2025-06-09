[Microsoft Graph SDK](README.md) / workbookTableColumn

Utilities for creating and working with workbook table column references.

## Functions

### createWorkbookTableColumnRef()

> **createWorkbookTableColumnRef**(`tableRef`, `column`): [`WorkbookTableColumnRef`](WorkbookTableColumnRef.md#workbooktablecolumnref)

Defined in: [src/services/workbookTableColumn.ts:18](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/workbookTableColumn.ts#L18)

Creates a reference to a workbook table column.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tableRef` | [`WorkbookTableRef`](WorkbookTableRef.md#workbooktableref) | The reference to the worksheet containing the table. |
| `column` | `undefined` \| `string` \| [`ColumnName`](ColumnName.md#columnname) | Name of the table column |

#### Returns

[`WorkbookTableColumnRef`](WorkbookTableColumnRef.md#workbooktablecolumnref)

A reference to the workbook table.

#### Throws

Error if the table ID is missing.
