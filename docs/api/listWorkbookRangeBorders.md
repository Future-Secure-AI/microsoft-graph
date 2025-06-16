[Microsoft Graph SDK](README.md) / listWorkbookRangeBorders

# listWorkbookRangeBorders

List the borders of a range.

## Functions

### listWorkbookRangeBorders()

> **listWorkbookRangeBorders**(`rangeRef`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookRangeBorder`[]\>

Defined in: [src/operations/workbookRange/listWorkbookRangeBorders.ts:20](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookRange/listWorkbookRangeBorders.ts#L20)

List the borders of a range.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](WorkbookRange-1.md#workbookrangeref) | Reference to the range whose borders will be listed. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookRangeBorder`[]\>

Array of borders for the specified range.

#### See

https://learn.microsoft.com/en-us/graph/api/rangeborder-list
