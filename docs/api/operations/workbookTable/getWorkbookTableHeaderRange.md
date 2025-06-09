[Microsoft Graph SDK](../../README.md) / operations/workbookTable/getWorkbookTableHeaderRange

## Functions

### getWorkbookTableHeaderRange()

> **getWorkbookTableHeaderRange**(`tableRef`): [`GraphOperation`](../../GraphOperation.md#graphoperation)\<`WorkbookRange` & [`SiteRef`](../../SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Defined in: [src/operations/workbookTable/getWorkbookTableHeaderRange.ts:18](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookTable/getWorkbookTableHeaderRange.ts#L18)

Retrieve the header row range of a table.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tableRef` | [`WorkbookTableRef`](../../WorkbookTableRef.md#workbooktableref) | A reference to the table, optionally including session information. |

#### Returns

[`GraphOperation`](../../GraphOperation.md#graphoperation)\<`WorkbookRange` & [`SiteRef`](../../SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

The header row range of the specified table, including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/table-headerrowrange
