[Microsoft Graph SDK](README.md) / iterateRows

# iterateRows

**`Experimental`**

Iterate over the rows in a given worksheet range.

## Functions

### iterateRows()

> **iterateRows**(`rangeRef`, `scope`, `maxCellsPerOperation`): `AsyncIterable`\<[`Row`](Row.md#row)\>

Defined in: [src/tasks/iterateRows.ts:38](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/iterateRows.ts#L38)

**`Experimental`**

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](WorkbookRange-1.md#workbookrangeref) | `undefined` | Reference to the workbook range to iterate over. |
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
