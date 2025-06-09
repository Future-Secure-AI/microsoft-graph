[Microsoft Graph SDK](README.md) / workbookWorksheet

Utilities for creating and working with workbook worksheet references.

## Variables

### defaultWorkbookWorksheetId

> `const` **defaultWorkbookWorksheetId**: [`WorkbookWorksheetId`](WorkbookWorksheetId.md#workbookworksheetid)

Defined in: [src/services/workbookWorksheet.ts:13](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/workbookWorksheet.ts#L13)

ID of the initial worksheet that is included in a new workbook.

***

### defaultWorkbookWorksheetName

> `const` **defaultWorkbookWorksheetName**: [`WorkbookWorksheetName`](WorkbookWorksheetName.md#workbookworksheetname)

Defined in: [src/services/workbookWorksheet.ts:16](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/workbookWorksheet.ts#L16)

Name of the initial worksheet that is included in a new workbook.

## Functions

### createDefaultWorkbookWorksheetRef()

> **createDefaultWorkbookWorksheetRef**(`workbookRef`): [`WorkbookWorksheetRef`](WorkbookWorksheetRef.md#workbookworksheetref)

Defined in: [src/services/workbookWorksheet.ts:45](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/workbookWorksheet.ts#L45)

Creates a reference to the default workbook worksheet that is initially included in all new workbooks.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `workbookRef` | [`WorkbookRef`](WorkbookRef.md#workbookref) | The reference to the workbook. |

#### Returns

[`WorkbookWorksheetRef`](WorkbookWorksheetRef.md#workbookworksheetref)

A reference to the default workbook worksheet.

***

### createWorkbookWorksheetRef()

> **createWorkbookWorksheetRef**(`workbookRef`, `worksheetId`): [`WorkbookWorksheetRef`](WorkbookWorksheetRef.md#workbookworksheetref)

Defined in: [src/services/workbookWorksheet.ts:25](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/workbookWorksheet.ts#L25)

Creates a reference to a workbook worksheet.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `workbookRef` | [`WorkbookRef`](WorkbookRef.md#workbookref) | The reference to the workbook. |
| `worksheetId` | `undefined` \| [`WorkbookWorksheetId`](WorkbookWorksheetId.md#workbookworksheetid) | The ID of the worksheet. |

#### Returns

[`WorkbookWorksheetRef`](WorkbookWorksheetRef.md#workbookworksheetref)

A reference to the workbook worksheet.

#### Throws

Error if the worksheet ID is missing.
