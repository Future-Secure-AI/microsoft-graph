[Microsoft Graph SDK](README.md) / readRows

# readRows

**`Experimental`**

Read all rows from a given workbook range.

## Functions

### readRows()

> **readRows**(`rangeRef`, `scope`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Cell`](Cell.md#cell)[][]\>

Defined in: [src/tasks/readRows.ts:23](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/readRows.ts#L23)

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

Where practical, prefer using [iterateRows](iterateRows.md#iteraterows) for more efficient memory usage.

#### Example

```ts
const rows = await readRows(rangeRef);
```
