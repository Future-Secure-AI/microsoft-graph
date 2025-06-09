[Microsoft Graph SDK](../../README.md) / operations/workbookRange/deleteWorkbookRange

## Functions

### deleteWorkbookRange()

> **deleteWorkbookRange**(`rangeRef`, `shift`): [`GraphOperation`](../../GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/workbookRange/deleteWorkbookRange.ts:15](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookRange/deleteWorkbookRange.ts#L15)

Delete a range.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](../../models/WorkbookRangeRef.md#workbookrangeref) | A reference to the range to be deleted, optionally including session information. |
| `shift` | `"Up"` \| `"Left"` | The direction to shift existing cells after deletion. Can be "Up" or "Left". |

#### Returns

[`GraphOperation`](../../GraphOperation.md#graphoperation)\<`void`\>

Nothing.

#### See

https://learn.microsoft.com/en-us/graph/api/range-clear
