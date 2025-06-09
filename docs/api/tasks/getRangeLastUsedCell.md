[Microsoft Graph SDK](../README.md) / tasks/getRangeLastUsedCell

## Functions

### getRangeLastUsedCell()

> **getRangeLastUsedCell**(`rangeRef`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`null` \| \{ `address`: `string`; `value`: `null` \| `string` \| `number` \| `boolean`; \}\>

Defined in: [src/tasks/getRangeLastUsedCell.ts:15](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/getRangeLastUsedCell.ts#L15)

Get the last used cell (i.e., the most lower-right cell) in a given range.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](../WorkbookRangeRef.md#workbookrangeref) | A reference to the workbook range to search. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`null` \| \{ `address`: `string`; `value`: `null` \| `string` \| `number` \| `boolean`; \}\>

The last used cell's value and address, or `null` if no cells are used.

#### Throws

If the range's row or column counts, or values, are missing.
