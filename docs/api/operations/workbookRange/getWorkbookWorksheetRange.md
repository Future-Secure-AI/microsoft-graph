[Microsoft Graph SDK](../../modules.md) / operations/workbookRange/getWorkbookWorksheetRange

## Functions

### getWorkbookWorksheetRange()

> **getWorkbookWorksheetRange**(`rangeRef`): [`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`WorkbookRange` & [`SiteRef`](../../models/SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Defined in: [src/operations/workbookRange/getWorkbookWorksheetRange.ts:15](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/operations/workbookRange/getWorkbookWorksheetRange.ts#L15)

Fetch a range, including values and formatting.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](../../models/WorkbookRangeRef.md#workbookrangeref) | A reference to the range to be fetched, optionally including session information. |

#### Returns

[`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`WorkbookRange` & [`SiteRef`](../../models/SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

The fetched range, including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/range-get
