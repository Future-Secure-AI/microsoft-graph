[Microsoft Graph SDK](../../modules.md) / operations/workbookRange/updateWorkbookRange

## Functions

### updateWorkbookRange()

> **updateWorkbookRange**(`rangeRef`, `update`): [`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`WorkbookRange` & [`SiteRef`](../../models/SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Defined in: [src/operations/workbookRange/updateWorkbookRange.ts:16](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/operations/workbookRange/updateWorkbookRange.ts#L16)

Update a range, including values and formatting. Properties that aren't included in the request maintain their previous values or are recalculated based on changes to other property values.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](../../models/WorkbookRangeRef.md#workbookrangeref) | A reference to the range to be updated, optionally including session information. |
| `update` | `WorkbookRange` | The updated properties for the range. |

#### Returns

[`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`WorkbookRange` & [`SiteRef`](../../models/SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

The updated range, including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/range-update
