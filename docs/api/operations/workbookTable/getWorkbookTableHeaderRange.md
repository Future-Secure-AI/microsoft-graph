[Microsoft Graph SDK](../../modules.md) / operations/workbookTable/getWorkbookTableHeaderRange

## Functions

### getWorkbookTableHeaderRange()

> **getWorkbookTableHeaderRange**(`tableRef`): [`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`WorkbookRange` & [`SiteRef`](../../models/SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Defined in: [src/operations/workbookTable/getWorkbookTableHeaderRange.ts:18](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/operations/workbookTable/getWorkbookTableHeaderRange.ts#L18)

Retrieve the header row range of a table.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tableRef` | [`WorkbookTableRef`](../../models/WorkbookTableRef.md#workbooktableref) | A reference to the table, optionally including session information. |

#### Returns

[`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`WorkbookRange` & [`SiteRef`](../../models/SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

The header row range of the specified table, including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/table-headerrowrange
