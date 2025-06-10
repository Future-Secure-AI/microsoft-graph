[Microsoft Graph SDK](README.md) / workbookTable

# workbookTable

Utilities for creating and working with workbook table references.

## Functions

### createWorkbookTableRef()

> **createWorkbookTableRef**(`worksheetRef`, `tableId`): [`WorkbookTableRef`](WorkbookTable-1.md#workbooktableref)

Defined in: [src/services/workbookTable.ts:17](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/workbookTable.ts#L17)

Creates a reference to a workbook table.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `worksheetRef` | [`WorkbookWorksheetRef`](WorkbookWorksheet-1.md#workbookworksheetref) | The reference to the worksheet containing the table. |
| `tableId` | `undefined` \| [`WorkbookTableId`](WorkbookTable-1.md#workbooktableid) | The ID of the table. |

#### Returns

[`WorkbookTableRef`](WorkbookTable-1.md#workbooktableref)

A reference to the workbook table.

#### Throws

Error if the table ID is missing.
