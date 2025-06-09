[Microsoft Graph SDK](../../README.md) / operations/workbookRange/getWorkbookRangeFill

## Functions

### getWorkbookRangeFill()

> **getWorkbookRangeFill**(`rangeRef`): [`GraphOperation`](../../GraphOperation.md#graphoperation)\<`WorkbookRangeFill` & [`SiteRef`](../../SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Defined in: [src/operations/workbookRange/getWorkbookRangeFill.ts:17](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookRange/getWorkbookRangeFill.ts#L17)

Retrieve the fill format of a workbook range.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](../../WorkbookRangeRef.md#workbookrangeref) | A reference to the range, optionally including session information. |

#### Returns

[`GraphOperation`](../../GraphOperation.md#graphoperation)\<`WorkbookRangeFill` & [`SiteRef`](../../SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

The fill format of the specified range, including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/rangefill-get
