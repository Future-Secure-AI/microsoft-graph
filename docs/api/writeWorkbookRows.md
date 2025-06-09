[Microsoft Graph SDK](README.md) / writeWorkbookRows

# writeWorkbookRows

Write rows to a workbook range.

## Functions

### writeWorkbookRows()

> **writeWorkbookRows**(`originRef`, `rows`, `overwriteMaxRowsPerChunk`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`number`\>

Defined in: [src/tasks/writeWorkbookRows.ts:23](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/writeWorkbookRows.ts#L23)

Write rows to a workbook range.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `originRef` | [`WorkbookRangeRef`](WorkbookRangeRef.md#workbookrangeref) | `undefined` | The reference to the workbook range where rows will be written. Only the upper-left is used as an origin point. |
| `rows` | [`Iterable`](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html#iterable-interface)\<[`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`Cell`](Cell.md#cell)\>[], `any`, `any`\> \| `AsyncIterable`\<[`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`Cell`](Cell.md#cell)\>[], `any`, `any`\> | `undefined` | An iterable or async iterable of rows to write. Each row is an array of cells. |
| `overwriteMaxRowsPerChunk` | `null` \| `number` | `null` | Overwrite the number of rows per underlying request. DO NOT SET EXCEPT FOR ADVANCED TUNING. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`number`\>

Number of rows written.
