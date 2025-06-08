[Microsoft Graph SDK](../../README.md) / operations/workbookRange/setWorkbookRangeFill

## Functions

### setWorkbookRangeFill()

> **setWorkbookRangeFill**(`rangeRef`, `format`): [`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/workbookRange/setWorkbookRangeFill.ts:15](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookRange/setWorkbookRangeFill.ts#L15)

Update the fill format of a workbook range.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](../../models/WorkbookRangeRef.md#workbookrangeref) | A reference to the range to be formatted, optionally including session information. |
| `format` | `WorkbookRangeFill` | The fill format properties to apply to the range. |

#### Returns

[`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`void`\>

#### See

https://learn.microsoft.com/en-us/graph/api/rangefill-update
