[Microsoft Graph SDK](README.md) / setRowHidden

Set one or more rows visibility.

## Functions

### setRowHidden()

> **setRowHidden**(`rangeRef`, `hidden`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`WorkbookRange` & [`SiteRef`](SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Defined in: [src/tasks/setRowHidden.ts:18](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/setRowHidden.ts#L18)

Set one or more rows visibility.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](WorkbookRangeRef.md#workbookrangeref) | Reference to the workbook range representing the rows to hide or show. |
| `hidden` | `boolean` | Boolean indicating whether to hide (`true`) or show (`false`) the rows. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`WorkbookRange` & [`SiteRef`](SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

The updated workbook range.
