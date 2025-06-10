[Microsoft Graph SDK](README.md) / setWorkbookRangeFill

# setWorkbookRangeFill

Update the fill format of a workbook range.

## Functions

### setWorkbookRangeFill()

> **setWorkbookRangeFill**(`rangeRef`, `format`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/workbookRange/setWorkbookRangeFill.ts:20](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookRange/setWorkbookRangeFill.ts#L20)

Update the fill format of a workbook range.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](WorkbookRange-1.md#workbookrangeref) | Reference to the range to be formatted. |
| `format` | `WorkbookRangeFill` | Fill format properties to apply to the range. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`void`\>

#### See

https://learn.microsoft.com/en-us/graph/api/rangefill-update
