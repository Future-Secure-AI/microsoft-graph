[Microsoft Graph SDK](../../README.md) / operations/workbookRange/getWorkbookVisibleRange

## Functions

### getWorkbookVisibleRange()

> **getWorkbookVisibleRange**(`rangeRef`): [`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`WorkbookRangeView` & [`SiteRef`](../../models/SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Defined in: [src/operations/workbookRange/getWorkbookVisibleRange.ts:15](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookRange/getWorkbookVisibleRange.ts#L15)

Retrieve the visible view of a range.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](../../models/WorkbookRangeRef.md#workbookrangeref) | A reference to the range to be fetched, optionally including session information. |

#### Returns

[`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`WorkbookRangeView` & [`SiteRef`](../../models/SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

The visible view of the specified range, including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/workbookrange-visibleview
