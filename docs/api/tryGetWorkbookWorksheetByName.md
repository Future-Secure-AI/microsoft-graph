[Microsoft Graph SDK](README.md) / tryGetWorkbookWorksheetByName

# tryGetWorkbookWorksheetByName

Attempts to retrieve a worksheet by its name, returning null if not found.

## Functions

### tryGetWorkbookWorksheetByName()

> **tryGetWorkbookWorksheetByName**(`workbookRef`, `name`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`null` \| `WorkbookWorksheet` & [`SiteRef`](Site-1.md#siteref) & `object` & `object` & `object` & `object`\>

Defined in: [src/tasks/tryGetWorkbookWorksheetByName.ts:19](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/tryGetWorkbookWorksheetByName.ts#L19)

Attempts to retrieve a worksheet by its name.
Returns null if the worksheet does not exist (NotFoundError).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `workbookRef` | [`WorkbookRef`](Workbook.md#workbookref) | Reference to the workbook containing the worksheet. |
| `name` | [`WorkbookWorksheetName`](WorkbookWorksheet-1.md#workbookworksheetname) | The name of the worksheet to retrieve. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`null` \| `WorkbookWorksheet` & [`SiteRef`](Site-1.md#siteref) & `object` & `object` & `object` & `object`\>

The worksheet, or null if not found.
