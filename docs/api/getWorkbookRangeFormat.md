[Microsoft Graph SDK](README.md) / getWorkbookRangeFormat

# getWorkbookRangeFormat

Retrieve the format of a workbook range.

## Functions

### getWorkbookRangeFormat()

> **getWorkbookRangeFormat**(`rangeRef`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookRangeFormat` & [`SiteRef`](Site-1.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Defined in: [src/operations/workbookRange/getWorkbookRangeFormat.ts:20](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookRange/getWorkbookRangeFormat.ts#L20)

Retrieve the format of a workbook range.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](WorkbookRange-1.md#workbookrangeref) | Reference to the range. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookRangeFormat` & [`SiteRef`](Site-1.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Format of the specified range.

#### See

https://learn.microsoft.com/en-us/graph/api/rangeformat-get
