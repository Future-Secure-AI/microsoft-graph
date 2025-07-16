[Microsoft Graph SDK](README.md) / iterateWorkbookRangeRows

# iterateWorkbookRangeRows

**`Experimental`**

Iterate over the rows in a given worksheet range.

## Type Aliases

### IteratedRow

> **IteratedRow** = `object`

Defined in: [src/tasks/iterateWorkbookRangeRows.ts:35](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/iterateWorkbookRangeRows.ts#L35)

**`Experimental`**

Represents a row yielded by the [iterateWorkbookRangeRows](#iterateworkbookrangerows) generator.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="address"></a> `address` | [`RowAddress`](Address.md#rowaddress) | - | [src/tasks/iterateWorkbookRangeRows.ts:37](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/iterateWorkbookRangeRows.ts#L37) |
| <a id="cells"></a> `cells` | [`Cell`](Cell.md#cell)[] | Array of cells in the row, each containing value, text, format, and optionally style information depending on the scope. | [src/tasks/iterateWorkbookRangeRows.ts:36](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/iterateWorkbookRangeRows.ts#L36) |
| <a id="isfirst"></a> `isFirst` | `boolean` | If this is the first row in the iteration. | [src/tasks/iterateWorkbookRangeRows.ts:39](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/iterateWorkbookRangeRows.ts#L39) |
| <a id="islast"></a> `isLast` | `boolean` | If this is the last row in the iteration. | [src/tasks/iterateWorkbookRangeRows.ts:40](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/iterateWorkbookRangeRows.ts#L40) |
| <a id="offset"></a> `offset` | [`RowOffset`](Row.md#rowoffset) | Zero-based offset of the row within the original range. | [src/tasks/iterateWorkbookRangeRows.ts:38](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/iterateWorkbookRangeRows.ts#L38) |

## Functions

### iterateWorkbookRangeRows()

> **iterateWorkbookRangeRows**(`rangeRef`, `scope`, `maxCellsPerOperation`): `AsyncIterable`\<[`IteratedRow`](#iteratedrow)\>

Defined in: [src/tasks/iterateWorkbookRangeRows.ts:54](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/iterateWorkbookRangeRows.ts#L54)

**`Experimental`**

Iterate over the rows in a given worksheet range.

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
for await (const { cells } of iterateRows(rangeRef)) {
  console.log(cells);
}
```
