[Microsoft Graph SDK](README.md) / getWorkbookNamedRange

# getWorkbookNamedRange

Retrieve a named range.

## Functions

### getWorkbookNamedRange()

> **getWorkbookNamedRange**(`rangeRef`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookRange` & [`SiteRef`](SiteRef.md#siteref) & `object` & `object` & `object` & `object`\>

Defined in: [src/operations/workbookRange/getWorkbookNamedRange.ts:19](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookRange/getWorkbookNamedRange.ts#L19)

Retrieve a named range.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookNamedRangeRef`](WorkbookNamedRangeRef.md#workbooknamedrangeref) | Reference to the named range. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookRange` & [`SiteRef`](SiteRef.md#siteref) & `object` & `object` & `object` & `object`\>

Specified named range.

#### See

https://learn.microsoft.com/en-us/graph/api/range-get
