[Microsoft Graph SDK](../../README.md) / operations/workbookRange/mergeWorkbookRange

## Functions

### mergeWorkbookRange()

> **mergeWorkbookRange**(`rangeRef`, `across`): [`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/workbookRange/mergeWorkbookRange.ts:15](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookRange/mergeWorkbookRange.ts#L15)

Merge a range of cells in a worksheet.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](../../models/WorkbookRangeRef.md#workbookrangeref) | `undefined` | Reference to the worksheet range. |
| `across` | `boolean` | `false` | If true, merge cells in each row of the specified range as separate merged cells. If false or omitted, merge all cells in the range into a single cell. |

#### Returns

[`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`void`\>

The merged range, including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/range-merge
