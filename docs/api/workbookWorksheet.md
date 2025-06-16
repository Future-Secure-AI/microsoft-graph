[Microsoft Graph SDK](README.md) / workbookWorksheet

# workbookWorksheet

Utilities for creating and working with workbook worksheet references.

## Variables

### defaultWorkbookWorksheetId

> `const` **defaultWorkbookWorksheetId**: [`WorkbookWorksheetId`](WorkbookWorksheet-1.md#workbookworksheetid)

Defined in: [src/services/workbookWorksheet.ts:14](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/workbookWorksheet.ts#L14)

ID of the initial worksheet that is included in a new XLSX workbook.

#### Remarks

This does not work apply to XLSB workbooks.

***

### defaultWorkbookWorksheetName

> `const` **defaultWorkbookWorksheetName**: [`WorkbookWorksheetName`](WorkbookWorksheet-1.md#workbookworksheetname)

Defined in: [src/services/workbookWorksheet.ts:19](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/workbookWorksheet.ts#L19)

Name of the initial worksheet that is included in a new workbook.

## Functions

### createDefaultWorkbookWorksheetRef()

> **createDefaultWorkbookWorksheetRef**(`workbookRef`): [`WorkbookWorksheetRef`](WorkbookWorksheet-1.md#workbookworksheetref)

Defined in: [src/services/workbookWorksheet.ts:49](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/workbookWorksheet.ts#L49)

Creates a reference to the default workbook worksheet that is initially included in all new XLSX workbooks.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `workbookRef` | [`WorkbookRef`](Workbook.md#workbookref) | The reference to the workbook. |

#### Returns

[`WorkbookWorksheetRef`](WorkbookWorksheet-1.md#workbookworksheetref)

A reference to the default workbook worksheet.

#### Remarks

This does not work with XLSB workbooks.

***

### createWorkbookWorksheetRef()

> **createWorkbookWorksheetRef**(`workbookRef`, `worksheetId`): [`WorkbookWorksheetRef`](WorkbookWorksheet-1.md#workbookworksheetref)

Defined in: [src/services/workbookWorksheet.ts:28](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/workbookWorksheet.ts#L28)

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
