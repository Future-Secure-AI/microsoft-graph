[Microsoft Graph SDK](README.md) / updateWorkbookWorksheet

# updateWorkbookWorksheet

Update the name, position, and/or visibility of a worksheet.

## Functions

### updateWorkbookWorksheet()

> **updateWorkbookWorksheet**(`worksheetRef`, `updates`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookWorksheet` & [`SiteRef`](SiteRef.md#siteref) & `object` & `object` & `object` & `object`\>

Defined in: [src/operations/workbookWorksheet/updateWorkbookWorksheet.ts:23](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookWorksheet/updateWorkbookWorksheet.ts#L23)

Update the name, position, and/or visibility of a worksheet.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `worksheetRef` | [`WorkbookWorksheetRef`](WorkbookWorksheetRef.md#workbookworksheetref) | Reference to the worksheet to be updated. |
| `updates` | \{ `name?`: `string`; `position?`: `number`; `visibility?`: `"Visible"` \| `"Hidden"` \| `"VeryHidden"`; \} | An object containing the properties to update: - `name` (optional): The new name for the worksheet. - `position` (optional): The new position of the worksheet in the workbook. - `visibility` (optional): The visibility state of the worksheet - "Visible", "Hidden", or "VeryHidden". |
| `updates.name?` | `string` | - |
| `updates.position?` | `number` | - |
| `updates.visibility?` | `"Visible"` \| `"Hidden"` \| `"VeryHidden"` | - |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookWorksheet` & [`SiteRef`](SiteRef.md#siteref) & `object` & `object` & `object` & `object`\>

The updated worksheet, including its reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/worksheet-update
