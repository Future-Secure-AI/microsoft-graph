[Microsoft Graph SDK](README.md) / iterateRows

# iterateRows

**`Experimental`**

Iterate over the rows in a given worksheet range.

## Type Aliases

### IteratedRow

> **IteratedRow** = `object`

Defined in: [src/tasks/iterateWorkbookRangeRows.ts:33](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/iterateWorkbookRangeRows.ts#L33)

**`Experimental`**

Represents a row yielded by the [iterateWorkbookRangeRows](#iterateworkbookrangerows) generator.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="cells"></a> `cells` | [`Cell`](Cell.md#cell)[] | Array of cells in the row, each containing value, text, format, and optionally style information depending on the scope. | [src/tasks/iterateWorkbookRangeRows.ts:34](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/iterateWorkbookRangeRows.ts#L34) |
| <a id="isfirst"></a> `isFirst` | `boolean` | If this is the first row in the iteration. | [src/tasks/iterateWorkbookRangeRows.ts:36](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/iterateWorkbookRangeRows.ts#L36) |
| <a id="islast"></a> `isLast` | `boolean` | If this is the last row in the iteration. | [src/tasks/iterateWorkbookRangeRows.ts:37](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/iterateWorkbookRangeRows.ts#L37) |
| <a id="offset"></a> `offset` | [`RowOffset`](Row.md#rowoffset) | Zero-based offset of the row within the original range. | [src/tasks/iterateWorkbookRangeRows.ts:35](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/iterateWorkbookRangeRows.ts#L35) |

## Functions

### iterateWorkbookRangeRows()

> **iterateWorkbookRangeRows**(`rangeRef`, `scope`, `maxCellsPerOperation`): `AsyncIterable`\<[`IteratedRow`](#iteratedrow)\>

Defined in: [src/tasks/iterateWorkbookRangeRows.ts:51](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/iterateWorkbookRangeRows.ts#L51)

**`Experimental`**

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](WorkbookRange-1.md#workbookrangeref) | `undefined` | Reference to the workbook range to iterate over. |
| `scope` | [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`CellScope`](Cell.md#cellscope)\> | `defaultCellScope` | Amount of detail to include for each cell. |
| `maxCellsPerOperation` | `null` \| `number` | `null` | Prescribe max cells to retrieve per operation. `null` automatically determines value. DO NOT SET EXCEPT FOR ADVANCED TUNING. |

#### Returns

`AsyncIterable`\<[`IteratedRow`](#iteratedrow)\>

#### Example

```ts
for await (const { row } of iterateRows(rangeRef)) {
  console.log(row);
}
```
