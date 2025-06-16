[Microsoft Graph SDK](README.md) / mergeWorkbookRange

# mergeWorkbookRange

Merge a range of cells in a worksheet.

## Functions

### mergeWorkbookRange()

> **mergeWorkbookRange**(`rangeRef`, `across`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/workbookRange/mergeWorkbookRange.ts:20](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookRange/mergeWorkbookRange.ts#L20)

Merge a range of cells in a worksheet.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](WorkbookRange-1.md#workbookrangeref) | `undefined` | Reference to the worksheet range. |
| `across` | `boolean` | `false` | If true, merge cells in each row of the specified range as separate merged cells. If false or omitted, merge all cells in the range into a single cell. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`void`\>

The merged range.

#### See

https://learn.microsoft.com/en-us/graph/api/range-merge
