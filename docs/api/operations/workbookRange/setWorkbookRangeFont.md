[Microsoft Graph SDK](../../README.md) / operations/workbookRange/setWorkbookRangeFont

## Functions

### setWorkbookRangeFont()

> **setWorkbookRangeFont**(`rangeRef`, `format`): [`GraphOperation`](../../GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/workbookRange/setWorkbookRangeFont.ts:15](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookRange/setWorkbookRangeFont.ts#L15)

Update the font format of a workbook range.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](../../models/WorkbookRangeRef.md#workbookrangeref) | A reference to the range to be formatted, optionally including session information. |
| `format` | `WorkbookRangeFont` | The font format properties to apply to the range. |

#### Returns

[`GraphOperation`](../../GraphOperation.md#graphoperation)\<`void`\>

#### See

https://learn.microsoft.com/en-us/graph/api/rangefont-update
