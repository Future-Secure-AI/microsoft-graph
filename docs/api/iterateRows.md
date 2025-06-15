[Microsoft Graph SDK](README.md) / iterateRows

# iterateRows

**`Experimental`**

Iterate over the rows in a given worksheet range.

## Type Aliases

### IteratedRow

> **IteratedRow** = `object`

Defined in: [src/tasks/iterateRows.ts:34](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/iterateRows.ts#L34)

**`Experimental`**

Represents a row yielded by the [iterateRows](#iteraterows) generator.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="cells"></a> `cells` | [`Cell`](Cell.md#cell)[] | Array of cells in the row, each containing value, text, format, and optionally style information depending on the scope. | [src/tasks/iterateRows.ts:35](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/iterateRows.ts#L35) |
| <a id="isfirst"></a> `isFirst` | `boolean` | If this is the first row in the iteration. | [src/tasks/iterateRows.ts:37](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/iterateRows.ts#L37) |
| <a id="islast"></a> `isLast` | `boolean` | If this is the last row in the iteration. | [src/tasks/iterateRows.ts:38](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/iterateRows.ts#L38) |
| <a id="offset"></a> `offset` | [`RowOffset`](Row.md#rowoffset) | Zero-based offset of the row within the original range. | [src/tasks/iterateRows.ts:36](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/iterateRows.ts#L36) |

## Functions

### iterateRows()

> **iterateRows**(`rangeRef`, `scope`, `maxCellsPerOperation`): `AsyncIterable`\<[`IteratedRow`](#iteratedrow)\>

Defined in: [src/tasks/iterateRows.ts:53](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/iterateRows.ts#L53)

**`Experimental`**

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](WorkbookRange-1.md#workbookrangeref) | `undefined` | Reference to the workbook range to iterate over. |
| `scope` | [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`CellScope`](Cell.md#cellscope)\> | `defaultScope` | Amount of detail to include for each cell. |
| `maxCellsPerOperation` | `null` \| `number` | `null` | Prescribe max cells to retrieve per operation. `null` automatically determines value. DO NOT SET EXCEPT FOR ADVANCED TUNING. |

#### Returns

`AsyncIterable`\<[`IteratedRow`](#iteratedrow)\>

#### Remarks

Including `style` in the scope requires over three operations for each and every cell. Use this sparingly!

#### Example

```ts
for await (const { row } of iterateRows(rangeRef)) {
  console.log(row);
}
```
