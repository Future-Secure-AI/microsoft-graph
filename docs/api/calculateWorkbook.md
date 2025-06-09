[Microsoft Graph SDK](README.md) / calculateWorkbook

Recalculate a workbook.

## Functions

### calculateWorkbook()

> **calculateWorkbook**(`workbookRef`, `calculationType`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/workbook/calculateWorkbook.ts:19](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbook/calculateWorkbook.ts#L19)

Recalculate a workbook.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `workbookRef` | [`WorkbookRef`](WorkbookRef.md#workbookref) | `undefined` | Reference to the workbook to be recalculated. |
| `calculationType` | `"Full"` \| `"Recalculate"` \| `"FullRebuild"` | `"Recalculate"` | Type of recalculation to perform. Can be "Recalculate", "Full", or "FullRebuild". |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`void`\>

Nothing.

#### See

https://learn.microsoft.com/en-us/graph/api/workbookapplication-calculate

***

### ~~recalculateWorkbook()~~

> **recalculateWorkbook**(`workbookRef`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/workbook/calculateWorkbook.ts:40](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbook/calculateWorkbook.ts#L40)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `workbookRef` | [`WorkbookRef`](WorkbookRef.md#workbookref) | Reference to the workbook to be recalculated. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`void`\>

Nothing.

#### Deprecated

Use calculateWorkbook instead.
