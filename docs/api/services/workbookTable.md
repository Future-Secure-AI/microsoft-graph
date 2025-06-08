[Microsoft Graph SDK](../modules.md) / services/workbookTable

## Functions

### createWorkbookTableRef()

> **createWorkbookTableRef**(`worksheetRef`, `tableId`): [`WorkbookTableRef`](../models/WorkbookTableRef.md#workbooktableref)

Defined in: [src/services/workbookTable.ts:12](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/services/workbookTable.ts#L12)

Creates a reference to a workbook table.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `worksheetRef` | [`WorkbookWorksheetRef`](../models/WorkbookWorksheetRef.md#workbookworksheetref) | The reference to the worksheet containing the table. |
| `tableId` | `undefined` \| [`WorkbookTableId`](../models/WorkbookTableId.md#workbooktableid) | The ID of the table. |

#### Returns

[`WorkbookTableRef`](../models/WorkbookTableRef.md#workbooktableref)

A reference to the workbook table.

#### Throws

Error if the table ID is missing.
