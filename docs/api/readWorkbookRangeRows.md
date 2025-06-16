[Microsoft Graph SDK](README.md) / readWorkbookRangeRows

# readWorkbookRangeRows

**`Experimental`**

Read all rows from a given workbook range.

## Functions

### readWorkbookRangeRows()

> **readWorkbookRangeRows**(`rangeRef`, `scope`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Cell`](Cell.md#cell)[][]\>

Defined in: [src/tasks/readWorkbookRangeRows.ts:23](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/readWorkbookRangeRows.ts#L23)

**`Experimental`**

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](WorkbookRange-1.md#workbookrangeref) | `undefined` | Reference to the workbook range to read. |
| `scope` | [`CellScope`](Cell.md#cellscope) | `defaultCellScope` | Amount of detail to include for each cell. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Cell`](Cell.md#cell)[][]\>

A promise that resolves to an array of rows, each containing an array of cells.

#### Remarks

Where practical, prefer using [iterateWorkbookRangeRows](iterateWorkbookRangeRows.md#iterateworkbookrangerows) for more efficient memory usage.

#### Example

```ts
const rows = await readRows(rangeRef);
```
