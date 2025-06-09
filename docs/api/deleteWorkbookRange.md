[Microsoft Graph SDK](README.md) / deleteWorkbookRange

# deleteWorkbookRange

Delete a range.

## Functions

### deleteWorkbookRange()

> **deleteWorkbookRange**(`rangeRef`, `shift`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/workbookRange/deleteWorkbookRange.ts:20](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookRange/deleteWorkbookRange.ts#L20)

Delete a range.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](WorkbookRangeRef.md#workbookrangeref) | Reference to the range to be deleted. |
| `shift` | `"Up"` \| `"Left"` | Direction to shift existing cells after deletion - "Up" or "Left". |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`void`\>

Nothing.

#### See

https://learn.microsoft.com/en-us/graph/api/range-clear
