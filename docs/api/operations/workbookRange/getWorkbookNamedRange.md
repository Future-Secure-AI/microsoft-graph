[Microsoft Graph SDK](../../README.md) / operations/workbookRange/getWorkbookNamedRange

## Functions

### getWorkbookNamedRange()

> **getWorkbookNamedRange**(`rangeRef`): [`GraphOperation`](../../GraphOperation.md#graphoperation)\<`WorkbookRange` & [`SiteRef`](../../SiteRef.md#siteref) & `object` & `object` & `object` & `object`\>

Defined in: [src/operations/workbookRange/getWorkbookNamedRange.ts:14](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookRange/getWorkbookNamedRange.ts#L14)

Retrieve a range that has been defined using the "named range" functionality.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookNamedRangeRef`](../../WorkbookNamedRangeRef.md#workbooknamedrangeref) | A reference to the named range, optionally including session information. |

#### Returns

[`GraphOperation`](../../GraphOperation.md#graphoperation)\<`WorkbookRange` & [`SiteRef`](../../SiteRef.md#siteref) & `object` & `object` & `object` & `object`\>

The specified named range, including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/range-get
