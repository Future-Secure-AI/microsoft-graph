[Microsoft Graph SDK](README.md) / iterateRows

# iterateRows

**`Experimental`**

Iterate over the rows in a given worksheet range.

## Functions

### iterateRows()

> **iterateRows**(`rangeRef`, `skip`, `take`, `scope`, `maxCellsPerOperation`): `AsyncIterable`\<[`Row`](Row.md#row)\>

Defined in: [src/tasks/iterateRows.ts:39](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/iterateRows.ts#L39)

**`Experimental`**

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](WorkbookRange-1.md#workbookrangeref) | `undefined` | Reference to the workbook range to iterate over. |
| `skip` | `number` | `0` | Number of rows to skip before starting to yield rows. Can be negative to get last rows (e.g., -1 for the last row). |
| `take` | `number` | `Number.POSITIVE_INFINITY` | Max number of rows to yield. `POSITIVE_INFINITY` returns all rows. |
| `scope` | [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`CellScope`](Cell.md#cellscope)\> | `defaultScope` | Amount of detail to include for each cell. |
| `maxCellsPerOperation` | `null` \| `number` | `null` | Prescribe max cells to retrieve per operation. `null` automatically determines value. DO NOT SET EXCEPT FOR ADVANCED TUNING. |

#### Returns

`AsyncIterable`\<[`Row`](Row.md#row)\>

#### Remarks

Including `style` in the scope requires over three operations for each and every cell. Use this sparingly!

#### Example

```ts
for await (const row of iterateRows(rangeRef)) {
  console.log(row);
}
```
