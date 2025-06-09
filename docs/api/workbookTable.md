[Microsoft Graph SDK](README.md) / workbookTable

# workbookTable

Utilities for creating and working with workbook table references.

## Functions

### createWorkbookTableRef()

> **createWorkbookTableRef**(`worksheetRef`, `tableId`): [`WorkbookTableRef`](WorkbookTableRef.md#workbooktableref)

Defined in: [src/services/workbookTable.ts:18](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/workbookTable.ts#L18)

Creates a reference to a workbook table.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `worksheetRef` | [`WorkbookWorksheetRef`](WorkbookWorksheetRef.md#workbookworksheetref) | The reference to the worksheet containing the table. |
| `tableId` | `undefined` \| [`WorkbookTableId`](WorkbookTableId.md#workbooktableid) | The ID of the table. |

#### Returns

[`WorkbookTableRef`](WorkbookTableRef.md#workbooktableref)

A reference to the workbook table.

#### Throws

Error if the table ID is missing.
