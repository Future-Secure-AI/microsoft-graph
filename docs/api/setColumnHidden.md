[Microsoft Graph SDK](README.md) / setColumnHidden

Set one or more columns visibility.

## Functions

### setColumnHidden()

> **setColumnHidden**(`rangeRef`, `hidden`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`WorkbookRange` & [`SiteRef`](SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Defined in: [src/tasks/setColumnHidden.ts:18](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/setColumnHidden.ts#L18)

Set one or more columns visibility.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](WorkbookRangeRef.md#workbookrangeref) | Reference to the workbook range representing the columns to hide or show. |
| `hidden` | `boolean` | Boolean indicating whether to hide (`true`) or show (`false`) the columns. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`WorkbookRange` & [`SiteRef`](SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

The updated workbook range.
