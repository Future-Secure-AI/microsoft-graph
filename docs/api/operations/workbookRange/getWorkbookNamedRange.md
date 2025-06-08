[Microsoft Graph SDK](../../modules.md) / operations/workbookRange/getWorkbookNamedRange

## Functions

### getWorkbookNamedRange()

> **getWorkbookNamedRange**(`rangeRef`): [`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`WorkbookRange` & [`SiteRef`](../../models/SiteRef.md#siteref) & `object` & `object` & `object` & `object`\>

Defined in: [src/operations/workbookRange/getWorkbookNamedRange.ts:14](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/operations/workbookRange/getWorkbookNamedRange.ts#L14)

Retrieve a range that has been defined using the "named range" functionality.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookNamedRangeRef`](../../models/WorkbookNamedRangeRef.md#workbooknamedrangeref) | A reference to the named range, optionally including session information. |

#### Returns

[`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`WorkbookRange` & [`SiteRef`](../../models/SiteRef.md#siteref) & `object` & `object` & `object` & `object`\>

The specified named range, including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/range-get
