[Microsoft Graph SDK](README.md) / getWorkbookWorksheetRange

# getWorkbookWorksheetRange

Fetch a range.

## Functions

### getWorkbookWorksheetRange()

> **getWorkbookWorksheetRange**(`rangeRef`, `select?`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookRange` & [`SiteRef`](Site-1.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

Defined in: [src/operations/workbookRange/getWorkbookWorksheetRange.ts:23](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookRange/getWorkbookWorksheetRange.ts#L23)

Fetch a range.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](WorkbookRange-1.md#workbookrangeref) | Reference to the range to be fetched. |
| `select?` | \{ `numberFormat?`: `boolean`; `text?`: `boolean`; `values?`: `boolean`; \} | Optional parameters to select specific properties of the range. |
| `select.numberFormat?` | `boolean` | - |
| `select.text?` | `boolean` | - |
| `select.values?` | `boolean` | - |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`WorkbookRange` & [`SiteRef`](Site-1.md#siteref) & `object` & `object` & `object` & `object` & `object`\>

The fetched range, including values and formatting

#### See

https://learn.microsoft.com/en-us/graph/api/range-get
