[Microsoft Graph SDK](../README.md) / tasks/getWorkbookWorksheetByName

## Functions

### getWorkbookWorksheetByName()

> **getWorkbookWorksheetByName**(`workbookRef`, `name`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`WorkbookWorksheet` & [`SiteRef`](../SiteRef.md#siteref) & `object` & `object` & `object` & `object`\>

Defined in: [src/tasks/getWorkbookWorksheetByName.ts:15](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/getWorkbookWorksheetByName.ts#L15)

Get a worksheet by its name. Throws an error if not found.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `workbookRef` | [`WorkbookRef`](../WorkbookRef.md#workbookref) | A reference to the workbook containing the worksheet. |
| `name` | `string` | The name of the worksheet to retrieve. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`WorkbookWorksheet` & [`SiteRef`](../SiteRef.md#siteref) & `object` & `object` & `object` & `object`\>

The worksheet details.

#### Throws

If the worksheet with the specified name is not found.
