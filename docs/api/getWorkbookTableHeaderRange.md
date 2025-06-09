[Microsoft Graph SDK](README.md) / getWorkbookTableHeaderRange

# getWorkbookTableHeaderRange

Retrieve the header row range of a table.

## Functions

### getWorkbookTableHeaderRange()

> **getWorkbookTableHeaderRange**(`tableRef`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookRange` & [`SiteRef`](SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Defined in: [src/operations/workbookTable/getWorkbookTableHeaderRange.ts:23](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookTable/getWorkbookTableHeaderRange.ts#L23)

Retrieve the header row range of a table.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tableRef` | [`WorkbookTableRef`](WorkbookTableRef.md#workbooktableref) | Reference to the table. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookRange` & [`SiteRef`](SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

The header row range of the specified table.

#### See

https://learn.microsoft.com/en-us/graph/api/table-headerrowrange
