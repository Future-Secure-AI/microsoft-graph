[Microsoft Graph SDK](../../modules.md) / operations/workbookRange/unmergeWorkbookRange

## Functions

### unmergeWorkbookRange()

> **unmergeWorkbookRange**(`rangeRef`): [`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/workbookRange/unmergeWorkbookRange.ts:14](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/operations/workbookRange/unmergeWorkbookRange.ts#L14)

Unmerge a merged range of cells in a worksheet.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](../../models/WorkbookRangeRef.md#workbookrangeref) | Reference to the worksheet range. |

#### Returns

[`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`void`\>

A void GraphOperation indicating completion.

#### See

https://learn.microsoft.com/en-us/graph/api/range-unmerge
