[Microsoft Graph SDK](README.md) / clearWorkbookRange

# clearWorkbookRange

Clear a range - content, formatting, or both.

## Functions

### clearWorkbookRange()

> **clearWorkbookRange**(`rangeRef`, `applyTo`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/workbookRange/clearWorkbookRange.ts:19](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookRange/clearWorkbookRange.ts#L19)

Clear a range - content, formatting, or both.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](WorkbookRange-1.md#workbookrangeref) | `undefined` | Reference to the range to be cleared. |
| `applyTo` | `"All"` \| `"Formats"` \| `"Contents"` | `"All"` | What to clear - "All", "Formats", or "Contents". * |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`void`\>

#### See

https://learn.microsoft.com/en-us/graph/api/range-delete
