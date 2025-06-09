[Microsoft Graph SDK](README.md) / getWorkbookRangeFill

# getWorkbookRangeFill

Retrieve the fill format of a workbook range.

## Functions

### getWorkbookRangeFill()

> **getWorkbookRangeFill**(`rangeRef`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookRangeFill` & [`SiteRef`](SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Defined in: [src/operations/workbookRange/getWorkbookRangeFill.ts:22](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookRange/getWorkbookRangeFill.ts#L22)

Retrieve the fill format of a workbook range.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](WorkbookRangeRef.md#workbookrangeref) | Reference to the range. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookRangeFill` & [`SiteRef`](SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Fill format of the specified range.

#### See

https://learn.microsoft.com/en-us/graph/api/rangefill-get
