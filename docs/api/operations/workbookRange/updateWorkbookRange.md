[Microsoft Graph SDK](../../README.md) / operations/workbookRange/updateWorkbookRange

## Functions

### updateWorkbookRange()

> **updateWorkbookRange**(`rangeRef`, `update`): [`GraphOperation`](../../GraphOperation.md#graphoperation)\<`WorkbookRange` & [`SiteRef`](../../SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Defined in: [src/operations/workbookRange/updateWorkbookRange.ts:16](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookRange/updateWorkbookRange.ts#L16)

Update a range, including values and formatting. Properties that aren't included in the request maintain their previous values or are recalculated based on changes to other property values.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](../../WorkbookRangeRef.md#workbookrangeref) | A reference to the range to be updated, optionally including session information. |
| `update` | `WorkbookRange` | The updated properties for the range. |

#### Returns

[`GraphOperation`](../../GraphOperation.md#graphoperation)\<`WorkbookRange` & [`SiteRef`](../../SiteRef.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

The updated range, including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/range-update
