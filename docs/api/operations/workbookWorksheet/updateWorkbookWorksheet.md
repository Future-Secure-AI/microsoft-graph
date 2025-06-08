[Microsoft Graph SDK](../../modules.md) / operations/workbookWorksheet/updateWorkbookWorksheet

## Functions

### updateWorkbookWorksheet()

> **updateWorkbookWorksheet**(`worksheetRef`, `updates`): [`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`WorkbookWorksheet` & [`SiteRef`](../../models/SiteRef.md#siteref) & `object` & `object` & `object` & `object`\>

Defined in: [src/operations/workbookWorksheet/updateWorkbookWorksheet.ts:18](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/operations/workbookWorksheet/updateWorkbookWorksheet.ts#L18)

Update the name, position, and/or visibility of a worksheet.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `worksheetRef` | [`WorkbookWorksheetRef`](../../models/WorkbookWorksheetRef.md#workbookworksheetref) | A reference to the worksheet to be updated, optionally including session information. |
| `updates` | \{ `name?`: `string`; `position?`: `number`; `visibility?`: `"Visible"` \| `"Hidden"` \| `"VeryHidden"`; \} | An object containing the properties to update: - `name` (optional): The new name for the worksheet. - `position` (optional): The new position of the worksheet in the workbook. - `visibility` (optional): The visibility state of the worksheet. Can be "Visible", "Hidden", or "VeryHidden". |
| `updates.name?` | `string` | - |
| `updates.position?` | `number` | - |
| `updates.visibility?` | `"Visible"` \| `"Hidden"` \| `"VeryHidden"` | - |

#### Returns

[`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`WorkbookWorksheet` & [`SiteRef`](../../models/SiteRef.md#siteref) & `object` & `object` & `object` & `object`\>

The updated worksheet, including its reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/worksheet-update
