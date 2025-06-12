[Microsoft Graph SDK](README.md) / setWorkbookRangeBorder

# setWorkbookRangeBorder

Update a specific border of a workbook range.

## Functions

### setWorkbookRangeBorder()

> **setWorkbookRangeBorder**(`rangeRef`, `side`, `values`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookRangeBorder` & [`SiteRef`](Site-1.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Defined in: [src/operations/workbookRange/setWorkbookRangeBorder.ts:23](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookRange/setWorkbookRangeBorder.ts#L23)

Update a specific border of a workbook range.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](WorkbookRange-1.md#workbookrangeref) | Reference to the range whose border will be updated. |
| `side` | [`BorderSide`](Border.md#borderside) | The border side to update (e.g., "EdgeTop", "EdgeBottom", "EdgeLeft", "EdgeRight", "InsideHorizontal", "InsideVertical"). |
| `values` | [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`Border`](Border.md#border)\> | Partial border object to update (color, style, weight, etc.). |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookRangeBorder` & [`SiteRef`](Site-1.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

The updated border for the specified range and side.

#### See

https://learn.microsoft.com/en-us/graph/api/rangeborder-update
