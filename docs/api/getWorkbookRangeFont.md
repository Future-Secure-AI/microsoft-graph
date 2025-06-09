[Microsoft Graph SDK](README.md) / getWorkbookRangeFont

# getWorkbookRangeFont

Retrieve the font format of a workbook range.

## Functions

### getWorkbookRangeFont()

> **getWorkbookRangeFont**(`rangeRef`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookRangeFont` & [`SiteRef`](SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Defined in: [src/operations/workbookRange/getWorkbookRangeFont.ts:22](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookRange/getWorkbookRangeFont.ts#L22)

Retrieve the font format of a workbook range.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](WorkbookRangeRef.md#workbookrangeref) | Reference to the range. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookRangeFont` & [`SiteRef`](SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Font format of the specified range.

#### See

https://learn.microsoft.com/en-us/graph/api/rangefont-get
