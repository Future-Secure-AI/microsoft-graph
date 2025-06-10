[Microsoft Graph SDK](README.md) / workbookWorksheet

# workbookWorksheet

Utilities for creating and working with workbook worksheet references.

## Variables

### defaultWorkbookWorksheetId

> `const` **defaultWorkbookWorksheetId**: [`WorkbookWorksheetId`](WorkbookWorksheet-1.md#workbookworksheetid)

Defined in: [src/services/workbookWorksheet.ts:11](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/workbookWorksheet.ts#L11)

ID of the initial worksheet that is included in a new workbook.

***

### defaultWorkbookWorksheetName

> `const` **defaultWorkbookWorksheetName**: [`WorkbookWorksheetName`](WorkbookWorksheet-1.md#workbookworksheetname)

Defined in: [src/services/workbookWorksheet.ts:14](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/workbookWorksheet.ts#L14)

Name of the initial worksheet that is included in a new workbook.

## Functions

### createDefaultWorkbookWorksheetRef()

> **createDefaultWorkbookWorksheetRef**(`workbookRef`): [`WorkbookWorksheetRef`](WorkbookWorksheet-1.md#workbookworksheetref)

Defined in: [src/services/workbookWorksheet.ts:43](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/workbookWorksheet.ts#L43)

Creates a reference to the default workbook worksheet that is initially included in all new workbooks.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `workbookRef` | [`WorkbookRef`](Workbook.md#workbookref) | The reference to the workbook. |

#### Returns

[`WorkbookWorksheetRef`](WorkbookWorksheet-1.md#workbookworksheetref)

A reference to the default workbook worksheet.

***

### createWorkbookWorksheetRef()

> **createWorkbookWorksheetRef**(`workbookRef`, `worksheetId`): [`WorkbookWorksheetRef`](WorkbookWorksheet-1.md#workbookworksheetref)

Defined in: [src/services/workbookWorksheet.ts:23](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/workbookWorksheet.ts#L23)

Creates a reference to a workbook worksheet.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `workbookRef` | [`WorkbookRef`](Workbook.md#workbookref) | The reference to the workbook. |
| `worksheetId` | `undefined` \| [`WorkbookWorksheetId`](WorkbookWorksheet-1.md#workbookworksheetid) | The ID of the worksheet. |

#### Returns

[`WorkbookWorksheetRef`](WorkbookWorksheet-1.md#workbookworksheetref)

A reference to the workbook worksheet.

#### Throws

Error if the worksheet ID is missing.
