[Microsoft Graph SDK](../../README.md) / operations/workbookRange/setWorkbookRangeFormat

## Functions

### setWorkbookRangeFormat()

> **setWorkbookRangeFormat**(`rangeRef`, `format`): [`GraphOperation`](../../GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/workbookRange/setWorkbookRangeFormat.ts:18](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookRange/setWorkbookRangeFormat.ts#L18)

Update the general format of a workbook range.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](../../models/WorkbookRangeRef.md#workbookrangeref) | A reference to the range to be formatted, optionally including session information. |
| `format` | `WorkbookRangeFormat` | The general format properties to apply to the range. |

#### Returns

[`GraphOperation`](../../GraphOperation.md#graphoperation)\<`void`\>

#### See

https://learn.microsoft.com/en-us/graph/api/rangeformat-update
