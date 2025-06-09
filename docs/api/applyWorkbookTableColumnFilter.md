[Microsoft Graph SDK](README.md) / applyWorkbookTableColumnFilter

# applyWorkbookTableColumnFilter

Apply a filter to a workbook table column.

## Functions

### applyWorkbookTableColumnFilter()

> **applyWorkbookTableColumnFilter**(`columnRef`, `criteria`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/workbookTable/applyWorkbookTableColumnFilter.ts:20](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookTable/applyWorkbookTableColumnFilter.ts#L20)

Apply a filter to a workbook table column.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `columnRef` | [`WorkbookTableColumnRef`](WorkbookTableColumnRef.md#workbooktablecolumnref) | Reference to the table column. |
| `criteria` | `WorkbookFilterCriteria` | Filter criteria to apply. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`void`\>

#### Remarks

If you intend to immediately read the visible range from this table after changing the filter you must perform a `calculateWorksheet` otherwise the changes may not yet have taken effect.

#### See

https://learn.microsoft.com/en-us/graph/api/filter-apply
