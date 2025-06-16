[Microsoft Graph SDK](README.md) / getWorkbookWorksheetUsedRangeRef

# getWorkbookWorksheetUsedRangeRef

Retrieve the address of the used range in a worksheet, ignoring trailing rows and columns that are blank.

## Functions

### getWorkbookWorksheetUsedRangeRef()

> **getWorkbookWorksheetUsedRangeRef**(`worksheetRef`): [`GraphOperation`](GraphOperation.md#graphoperation)\<[`WorkbookRangeRef`](WorkbookRange-1.md#workbookrangeref)\>

Defined in: [src/operations/workbookWorksheet/getWorkbookWorksheetUsedRangeRef.ts:28](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookWorksheet/getWorkbookWorksheetUsedRangeRef.ts#L28)

Retrieve the address of the used range in a worksheet, ignoring trailing rows and columns that are blank.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `worksheetRef` | [`WorkbookWorksheetRef`](WorkbookWorksheet-1.md#workbookworksheetref) | Reference to the worksheet. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<[`WorkbookRangeRef`](WorkbookRange-1.md#workbookrangeref)\>

Address of the used range of the worksheet.

#### See

https://learn.microsoft.com/en-us/graph/api/range-usedrange

#### Example

```ts
const usedRangeRef = await getWorkbookWorksheetUsedRangeRef(worksheetRef);
for await (const row of readWorkbookRows(usedRangeRef)) {
	 console.debug(row.map((cell) => cell.value).join(", "));
}
```
