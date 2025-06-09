[Microsoft Graph SDK](README.md) / setWorkbookRangeFormat

Update the general format of a workbook range.

## Functions

### setWorkbookRangeFormat()

> **setWorkbookRangeFormat**(`rangeRef`, `format`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/workbookRange/setWorkbookRangeFormat.ts:20](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookRange/setWorkbookRangeFormat.ts#L20)

Update the general format of a workbook range.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](WorkbookRangeRef.md#workbookrangeref) | Reference to the range to be formatted. |
| `format` | `WorkbookRangeFormat` | General format properties to apply to the range. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`void`\>

#### See

https://learn.microsoft.com/en-us/graph/api/rangeformat-update
