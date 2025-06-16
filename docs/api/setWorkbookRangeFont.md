[Microsoft Graph SDK](README.md) / setWorkbookRangeFont

# setWorkbookRangeFont

Update the font format of a workbook range.

## Functions

### setWorkbookRangeFont()

> **setWorkbookRangeFont**(`rangeRef`, `format`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/workbookRange/setWorkbookRangeFont.ts:20](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookRange/setWorkbookRangeFont.ts#L20)

Update the font format of a workbook range.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](WorkbookRange-1.md#workbookrangeref) | Reference to the range to be formatted. |
| `format` | `WorkbookRangeFont` | Font format properties to apply to the range. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`void`\>

#### See

https://learn.microsoft.com/en-us/graph/api/rangefont-update
