[Microsoft Graph SDK](README.md) / updateWorkbookRange

# updateWorkbookRange

Update a range, including values and formatting.

## Functions

### updateWorkbookRange()

> **updateWorkbookRange**(`rangeRef`, `update`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookRange` & [`SiteRef`](Site-1.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Defined in: [src/operations/workbookRange/updateWorkbookRange.ts:23](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookRange/updateWorkbookRange.ts#L23)

Update a range.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](WorkbookRange-1.md#workbookrangeref) | Reference to the range to be updated. |
| `update` | `WorkbookRange` | The updated properties for the range. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookRange` & [`SiteRef`](Site-1.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

The updated range.

#### Remarks

Properties that aren't included in the request maintain their previous values or are recalculated based on changes to other property values.

#### See

https://learn.microsoft.com/en-us/graph/api/range-update
