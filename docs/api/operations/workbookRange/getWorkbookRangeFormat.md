[Microsoft Graph SDK](../../README.md) / operations/workbookRange/getWorkbookRangeFormat

## Functions

### getWorkbookRangeFormat()

> **getWorkbookRangeFormat**(`rangeRef`): [`GraphOperation`](../../GraphOperation.md#graphoperation)\<`WorkbookRangeFormat` & [`SiteRef`](../../SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Defined in: [src/operations/workbookRange/getWorkbookRangeFormat.ts:15](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookRange/getWorkbookRangeFormat.ts#L15)

Retrieve the format of a workbook range.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](../../WorkbookRangeRef.md#workbookrangeref) | A reference to the range, optionally including session information. |

#### Returns

[`GraphOperation`](../../GraphOperation.md#graphoperation)\<`WorkbookRangeFormat` & [`SiteRef`](../../SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

The format of the specified range, including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/rangeformat-get
