[Microsoft Graph SDK](README.md) / clearWorkbookRange

# clearWorkbookRange

Clear a range - content, formatting, or both.

## Functions

### clearWorkbookRange()

> **clearWorkbookRange**(`rangeRef`, `applyTo`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/workbookRange/clearWorkbookRange.ts:20](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookRange/clearWorkbookRange.ts#L20)

Clear a range - content, formatting, or both.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](WorkbookRangeRef.md#workbookrangeref) | `undefined` | Reference to the range to be cleared. |
| `applyTo` | `"All"` \| `"Formats"` \| `"Contents"` | `"All"` | What to clear - "All", "Formats", or "Contents". |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`void`\>

Nothing.

#### See

https://learn.microsoft.com/en-us/graph/api/range-delete
