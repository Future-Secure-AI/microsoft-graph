[Microsoft Graph SDK](README.md) / workbookPivotTable

# workbookPivotTable

Utilities for working with workbook pivot tables and their references.

## Functions

### createWorkbookPivotTableRef()

> **createWorkbookPivotTableRef**(`worksheetRef`, `pivotTableId`): [`WorkbookPivotTableRef`](WorkbookPivotTable-1.md#workbookpivottableref)

Defined in: src/services/workbookPivotTable.ts:17

Creates a reference to a workbook pivot table.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `worksheetRef` | [`WorkbookWorksheetRef`](WorkbookWorksheet-1.md#workbookworksheetref) | Reference to the worksheet containing the pivot table. |
| `pivotTableId` | `undefined` \| [`WorkbookPivotTableId`](WorkbookPivotTable-1.md#workbookpivottableid) | ID of the pivot table. |

#### Returns

[`WorkbookPivotTableRef`](WorkbookPivotTable-1.md#workbookpivottableref)

Reference to the workbook pivot table.

#### Throws

Error if the pivot table ID is missing.
