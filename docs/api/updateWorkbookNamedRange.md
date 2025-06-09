[Microsoft Graph SDK](README.md) / updateWorkbookNamedRange

Update a named range.

## Functions

### updateWorkbookNamedRange()

> **updateWorkbookNamedRange**(`rangeRef`, `value`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/workbookRange/updateWorkbookNamedRange.ts:21](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookRange/updateWorkbookNamedRange.ts#L21)

Update a named range.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookNamedRangeRef`](WorkbookNamedRangeRef.md#workbooknamedrangeref) | Reference to the named range to be updated. |
| `value` | `WorkbookRange` | The updated properties for the named range. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`void`\>

Nothing.

#### Remarks

Properties that aren't included in the request maintain their previous values or are recalculated based on changes to other property values.

#### See

https://learn.microsoft.com/en-us/graph/api/range-update
