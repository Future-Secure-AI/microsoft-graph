[Microsoft Graph SDK](README.md) / readWorkbookRangeFirstRow

# readWorkbookRangeFirstRow

**`Experimental`**

Read the first row from a given workbook range.

## Functions

### readWorkbookRangeFirstRow()

> **readWorkbookRangeFirstRow**(`rangeRef`, `scope`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Cell`](Cell.md#cell)[]\>

Defined in: [src/tasks/readWorkbookRangeFirstRow.ts:23](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/readWorkbookRangeFirstRow.ts#L23)

**`Experimental`**

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](WorkbookRange-1.md#workbookrangeref) | `undefined` | Reference to the workbook range to read. |
| `scope` | [`CellScope`](Cell.md#cellscope) | `defaultCellScope` | Amount of detail to include for each cell. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Cell`](Cell.md#cell)[]\>

A promise that resolves to an array of cells in the first row.

#### Remarks

Particularly useful for reading header rows.

#### Example

```ts
const firstRow = await readWorkbookRangeFirstRow(rangeRef);
```
