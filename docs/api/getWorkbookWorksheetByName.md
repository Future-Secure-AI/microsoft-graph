[Microsoft Graph SDK](README.md) / getWorkbookWorksheetByName

# getWorkbookWorksheetByName

Get a worksheet by its name.

## Functions

### getWorkbookWorksheetByName()

> **getWorkbookWorksheetByName**(`workbookRef`, `name`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`WorkbookWorksheet` & [`SiteRef`](SiteRef.md#siteref) & `object` & `object` & `object` & `object`\>

Defined in: [src/tasks/getWorkbookWorksheetByName.ts:21](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/getWorkbookWorksheetByName.ts#L21)

Get a worksheet by its name.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `workbookRef` | [`WorkbookRef`](WorkbookRef.md#workbookref) | A reference to the workbook containing the worksheet. |
| `name` | `string` | The name of the worksheet to retrieve. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`WorkbookWorksheet` & [`SiteRef`](SiteRef.md#siteref) & `object` & `object` & `object` & `object`\>

Worksheet

#### Throws

[NotFoundError](NotFoundError.md) If the worksheet with the specified name is not found.
