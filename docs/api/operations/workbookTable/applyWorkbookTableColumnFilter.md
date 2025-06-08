[Microsoft Graph SDK](../../modules.md) / operations/workbookTable/applyWorkbookTableColumnFilter

## Functions

### applyWorkbookTableColumnFilter()

> **applyWorkbookTableColumnFilter**(`columnRef`, `criteria`): [`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/workbookTable/applyWorkbookTableColumnFilter.ts:15](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/operations/workbookTable/applyWorkbookTableColumnFilter.ts#L15)

Apply a filter to a workbook table column.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `columnRef` | [`WorkbookTableColumnRef`](../../models/WorkbookTableColumnRef.md#workbooktablecolumnref) | A reference to the table column. |
| `criteria` | `WorkbookFilterCriteria` | The filter criteria to apply. |

#### Returns

[`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`void`\>

#### Remarks

If you intend to immediately read the visible range from this table after changing the filter you must perform a `calculateWorksheet` otherwise the changes may not yet have taken effect.

#### See

https://learn.microsoft.com/en-us/graph/api/filter-apply
