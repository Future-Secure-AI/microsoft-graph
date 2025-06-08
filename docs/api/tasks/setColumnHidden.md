[Microsoft Graph SDK](../modules.md) / tasks/setColumnHidden

## Functions

### setColumnHidden()

> **setColumnHidden**(`rangeRef`, `hidden`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`WorkbookRange` & [`SiteRef`](../models/SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Defined in: [src/tasks/setColumnHidden.ts:14](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/tasks/setColumnHidden.ts#L14)

Hide or show one or more columns.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](../models/WorkbookRangeRef.md#workbookrangeref) | A reference to the workbook range representing the columns to hide or show. |
| `hidden` | `boolean` | A boolean indicating whether to hide (`true`) or show (`false`) the columns. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`WorkbookRange` & [`SiteRef`](../models/SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

The updated workbook range.
