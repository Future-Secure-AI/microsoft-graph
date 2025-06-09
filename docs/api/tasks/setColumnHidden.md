[Microsoft Graph SDK](../README.md) / tasks/setColumnHidden

## Functions

### setColumnHidden()

> **setColumnHidden**(`rangeRef`, `hidden`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`WorkbookRange` & [`SiteRef`](../SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Defined in: [src/tasks/setColumnHidden.ts:14](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/setColumnHidden.ts#L14)

Hide or show one or more columns.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](../WorkbookRangeRef.md#workbookrangeref) | A reference to the workbook range representing the columns to hide or show. |
| `hidden` | `boolean` | A boolean indicating whether to hide (`true`) or show (`false`) the columns. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`WorkbookRange` & [`SiteRef`](../SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

The updated workbook range.
