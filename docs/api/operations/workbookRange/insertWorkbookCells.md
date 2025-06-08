[Microsoft Graph SDK](../../README.md) / operations/workbookRange/insertWorkbookCells

## Functions

### insertWorkbookCells()

> **insertWorkbookCells**(`worksheetRef`, `address`, `shift`): [`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`WorkbookRange` & [`SiteRef`](../../models/SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Defined in: [src/operations/workbookRange/insertWorkbookCells.ts:21](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookRange/insertWorkbookCells.ts#L21)

Insert a new blank range at a specified address, shifting existing cells. Use `updateWorkbookRange` afterward to set content.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `worksheetRef` | [`WorkbookWorksheetRef`](../../models/WorkbookWorksheetRef.md#workbookworksheetref) | A reference to the worksheet where the range will be inserted, optionally including session information. |
| `address` | [`Address`](../../models/Address.md#address) | The address where the new range will be inserted. |
| `shift` | `"Down"` \| `"Right"` | The direction to shift existing cells. Can be "Down" or "Right". |

#### Returns

[`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`WorkbookRange` & [`SiteRef`](../../models/SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

The newly inserted range, including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/range-insert
