[Microsoft Graph SDK](README.md) / insertWorkbookCells

# insertWorkbookCells

Insert a new blank range at a specified address, shifting existing cells.

## Functions

### insertWorkbookCells()

> **insertWorkbookCells**(`rangeRef`, `shift`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookRange` & [`SiteRef`](Site-1.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Defined in: [src/operations/workbookRange/insertWorkbookCells.ts:24](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookRange/insertWorkbookCells.ts#L24)

Insert a new blank range at a specified address, shifting existing cells.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](WorkbookRange-1.md#workbookrangeref) | Reference to the worksheet range where the range will be inserted. |
| `shift` | `"Down"` \| `"Right"` | Direction to shift existing cells. Can be "Down" or "Right". |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookRange` & [`SiteRef`](Site-1.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Newly inserted range.

#### Remarks

This only inserts a new blank range at the specified address. To set content in the new range, use `updateWorkbookRange` afterward.

#### See

https://learn.microsoft.com/en-us/graph/api/range-insert
