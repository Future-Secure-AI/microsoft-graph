[Microsoft Graph SDK](README.md) / getWorkbookVisibleRange

# getWorkbookVisibleRange

Retrieve the visible view of a range.

## Functions

### getWorkbookVisibleRange()

> **getWorkbookVisibleRange**(`rangeRef`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookRangeView` & [`SiteRef`](SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Defined in: [src/operations/workbookRange/getWorkbookVisibleRange.ts:20](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookRange/getWorkbookVisibleRange.ts#L20)

Retrieve the visible view of a range.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](WorkbookRangeRef.md#workbookrangeref) | Reference to the range to be fetched. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookRangeView` & [`SiteRef`](SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Visible view of the specified range.

#### See

https://learn.microsoft.com/en-us/graph/api/workbookrange-visibleview
