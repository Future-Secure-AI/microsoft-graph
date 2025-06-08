[Microsoft Graph SDK](../../modules.md) / operations/workbookRange/getWorkbookRangeFont

## Functions

### getWorkbookRangeFont()

> **getWorkbookRangeFont**(`rangeRef`): [`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`WorkbookRangeFont` & [`SiteRef`](../../models/SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Defined in: [src/operations/workbookRange/getWorkbookRangeFont.ts:17](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/operations/workbookRange/getWorkbookRangeFont.ts#L17)

Retrieve the font format of a workbook range.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](../../models/WorkbookRangeRef.md#workbookrangeref) | A reference to the range, optionally including session information. |

#### Returns

[`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`WorkbookRangeFont` & [`SiteRef`](../../models/SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

The font format of the specified range, including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/rangefont-get
