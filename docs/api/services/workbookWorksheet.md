[Microsoft Graph SDK](../modules.md) / services/workbookWorksheet

## Variables

### defaultWorkbookWorksheetId

> `const` **defaultWorkbookWorksheetId**: [`WorkbookWorksheetId`](../models/WorkbookWorksheetId.md#workbookworksheetid)

Defined in: [src/services/workbookWorksheet.ts:7](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/services/workbookWorksheet.ts#L7)

ID of the initial worksheet that is included in a new workbook.

***

### defaultWorkbookWorksheetName

> `const` **defaultWorkbookWorksheetName**: [`WorkbookWorksheetName`](../models/WorkbookWorksheetName.md#workbookworksheetname)

Defined in: [src/services/workbookWorksheet.ts:10](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/services/workbookWorksheet.ts#L10)

Name of the initial worksheet that is included in a new workbook.

## Functions

### createDefaultWorkbookWorksheetRef()

> **createDefaultWorkbookWorksheetRef**(`workbookRef`): [`WorkbookWorksheetRef`](../models/WorkbookWorksheetRef.md#workbookworksheetref)

Defined in: [src/services/workbookWorksheet.ts:39](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/services/workbookWorksheet.ts#L39)

Creates a reference to the default workbook worksheet that is initially included in all new workbooks.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `workbookRef` | [`WorkbookRef`](../models/WorkbookRef.md#workbookref) | The reference to the workbook. |

#### Returns

[`WorkbookWorksheetRef`](../models/WorkbookWorksheetRef.md#workbookworksheetref)

A reference to the default workbook worksheet.

***

### createWorkbookWorksheetRef()

> **createWorkbookWorksheetRef**(`workbookRef`, `worksheetId`): [`WorkbookWorksheetRef`](../models/WorkbookWorksheetRef.md#workbookworksheetref)

Defined in: [src/services/workbookWorksheet.ts:19](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/services/workbookWorksheet.ts#L19)

Creates a reference to a workbook worksheet.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `workbookRef` | [`WorkbookRef`](../models/WorkbookRef.md#workbookref) | The reference to the workbook. |
| `worksheetId` | `undefined` \| [`WorkbookWorksheetId`](../models/WorkbookWorksheetId.md#workbookworksheetid) | The ID of the worksheet. |

#### Returns

[`WorkbookWorksheetRef`](../models/WorkbookWorksheetRef.md#workbookworksheetref)

A reference to the workbook worksheet.

#### Throws

Error if the worksheet ID is missing.
