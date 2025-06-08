[Microsoft Graph SDK](../README.md) / tasks/writeWorkbookRows

## Functions

### writeWorkbookRows()

> **writeWorkbookRows**(`originRef`, `rows`, `overrideMaxRowsPerUnderlyingRead`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`number`\>

Defined in: [src/tasks/writeWorkbookRows.ts:17](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/writeWorkbookRows.ts#L17)

Write rows to a workbook range. Uses batching to handle large datasets efficiently.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `originRef` | [`WorkbookRangeRef`](../models/WorkbookRangeRef.md#workbookrangeref) | `undefined` | The reference to the workbook range where rows will be written. Only the upper-left is used as an origin point. |
| `rows` | [`Iterable`](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html#iterable-interface)\<[`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`Cell`](../models/Cell.md#cell)\>[], `any`, `any`\> \| `AsyncIterable`\<[`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`Cell`](../models/Cell.md#cell)\>[], `any`, `any`\> | `undefined` | An iterable or async iterable of rows to write. Each row is an array of cells. |
| `overrideMaxRowsPerUnderlyingRead` | `null` \| `number` | `null` | Optional maximum number of rows to write in a single underlying read. If not provided, it will be automatically calculated based on a safe value. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`number`\>
