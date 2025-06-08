[Microsoft Graph SDK](../modules.md) / services/workbookTableColumn

## Functions

### createWorkbookTableColumnRef()

> **createWorkbookTableColumnRef**(`tableRef`, `column`): [`WorkbookTableColumnRef`](../models/WorkbookTableColumnRef.md#workbooktablecolumnref)

Defined in: [src/services/workbookTableColumn.ts:12](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/services/workbookTableColumn.ts#L12)

Creates a reference to a workbook table column.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tableRef` | [`WorkbookTableRef`](../models/WorkbookTableRef.md#workbooktableref) | The reference to the worksheet containing the table. |
| `column` | `undefined` \| `string` \| [`ColumnName`](../models/ColumnName.md#columnname) | Name of the table column |

#### Returns

[`WorkbookTableColumnRef`](../models/WorkbookTableColumnRef.md#workbooktablecolumnref)

A reference to the workbook table.

#### Throws

Error if the table ID is missing.
