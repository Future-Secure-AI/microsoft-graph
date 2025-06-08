[Microsoft Graph SDK](../../README.md) / operations/workbookRange/clearWorkbookRange

## Functions

### clearWorkbookRange()

> **clearWorkbookRange**(`rangeRef`, `applyTo`): [`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/workbookRange/clearWorkbookRange.ts:15](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookRange/clearWorkbookRange.ts#L15)

Clear a range - content, formatting, or both.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](../../models/WorkbookRangeRef.md#workbookrangeref) | `undefined` | A reference to the range to be cleared, optionally including session information. |
| `applyTo` | `"All"` \| `"Formats"` \| `"Contents"` | `"All"` | Specifies what to clear. Can be "All", "Formats", or "Contents". Defaults to "All". |

#### Returns

[`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`void`\>

Nothing.

#### See

https://learn.microsoft.com/en-us/graph/api/range-delete
