[Microsoft Graph SDK](README.md) / insertWorkbookCells

# insertWorkbookCells

Insert a new blank range at a specified address, shifting existing cells.

## Functions

### insertWorkbookCells()

> **insertWorkbookCells**(`worksheetRef`, `address`, `shift`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookRange` & [`SiteRef`](SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Defined in: [src/operations/workbookRange/insertWorkbookCells.ts:27](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookRange/insertWorkbookCells.ts#L27)

Insert a new blank range at a specified address, shifting existing cells.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `worksheetRef` | [`WorkbookWorksheetRef`](WorkbookWorksheetRef.md#workbookworksheetref) | Reference to the worksheet where the range will be inserted. |
| `address` | [`Address`](Address.md#address) | Address where the new range will be inserted. |
| `shift` | `"Down"` \| `"Right"` | Direction to shift existing cells. Can be "Down" or "Right". |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookRange` & [`SiteRef`](SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Newly inserted range.

#### Remarks

This only inserts a new blank range at the specified address. To set content in the new range, use `updateWorkbookRange` afterward.

#### See

https://learn.microsoft.com/en-us/graph/api/range-insert
