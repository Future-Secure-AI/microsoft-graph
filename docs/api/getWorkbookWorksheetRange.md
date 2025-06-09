[Microsoft Graph SDK](README.md) / getWorkbookWorksheetRange

Fetch a range.

## Functions

### getWorkbookWorksheetRange()

> **getWorkbookWorksheetRange**(`rangeRef`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookRange` & [`SiteRef`](SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Defined in: [src/operations/workbookRange/getWorkbookWorksheetRange.ts:20](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookRange/getWorkbookWorksheetRange.ts#L20)

Fetch a range.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](WorkbookRangeRef.md#workbookrangeref) | Reference to the range to be fetched. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookRange` & [`SiteRef`](SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

The fetched range, including values and formatting

#### See

https://learn.microsoft.com/en-us/graph/api/range-get
