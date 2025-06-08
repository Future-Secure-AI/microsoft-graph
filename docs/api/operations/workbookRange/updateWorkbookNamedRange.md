[Microsoft Graph SDK](../../README.md) / operations/workbookRange/updateWorkbookNamedRange

## Functions

### updateWorkbookNamedRange()

> **updateWorkbookNamedRange**(`rangeRef`, `value`): [`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/workbookRange/updateWorkbookNamedRange.ts:15](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookRange/updateWorkbookNamedRange.ts#L15)

Update a range that has been defined using the "named range" functionality. Properties that aren't included in the request maintain their previous values or are recalculated based on changes to other property values.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookNamedRangeRef`](../../models/WorkbookNamedRangeRef.md#workbooknamedrangeref) | A reference to the named range to be updated, optionally including session information. |
| `value` | `WorkbookRange` | The updated properties for the named range. |

#### Returns

[`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`void`\>

Nothing.

#### See

https://learn.microsoft.com/en-us/graph/api/range-update
