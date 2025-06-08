[Microsoft Graph SDK](../../README.md) / operations/workbook/calculateWorkbook

## Functions

### calculateWorkbook()

> **calculateWorkbook**(`workbookRef`, `calculationType`): [`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/workbook/calculateWorkbook.ts:14](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbook/calculateWorkbook.ts#L14)

Recalculate a workbook.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `workbookRef` | [`WorkbookRef`](../../models/WorkbookRef.md#workbookref) | `undefined` | A reference to the workbook to be recalculated. |
| `calculationType` | `"Full"` \| `"Recalculate"` \| `"FullRebuild"` | `"Recalculate"` | The type of recalculation to perform. Can be "Recalculate", "Full", or "FullRebuild". Defaults to "Recalculate". |

#### Returns

[`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`void`\>

Nothing.

#### See

https://learn.microsoft.com/en-us/graph/api/workbookapplication-calculate

***

### ~~recalculateWorkbook()~~

> **recalculateWorkbook**(`workbookRef`): [`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/workbook/calculateWorkbook.ts:35](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbook/calculateWorkbook.ts#L35)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `workbookRef` | [`WorkbookRef`](../../models/WorkbookRef.md#workbookref) | A reference to the workbook to be recalculated. |

#### Returns

[`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`void`\>

Nothing.

#### Deprecated

Use calculateWorkbook instead.
