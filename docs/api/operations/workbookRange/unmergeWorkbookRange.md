[Microsoft Graph SDK](../../README.md) / operations/workbookRange/unmergeWorkbookRange

## Functions

### unmergeWorkbookRange()

> **unmergeWorkbookRange**(`rangeRef`): [`GraphOperation`](../../GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/workbookRange/unmergeWorkbookRange.ts:14](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookRange/unmergeWorkbookRange.ts#L14)

Unmerge a merged range of cells in a worksheet.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](../../WorkbookRangeRef.md#workbookrangeref) | Reference to the worksheet range. |

#### Returns

[`GraphOperation`](../../GraphOperation.md#graphoperation)\<`void`\>

A void GraphOperation indicating completion.

#### See

https://learn.microsoft.com/en-us/graph/api/range-unmerge
