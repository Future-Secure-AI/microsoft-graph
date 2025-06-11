[Microsoft Graph SDK](README.md) / setRowHidden

# setRowHidden

Set one or more rows visibility.

## Functions

### setRowHidden()

> **setRowHidden**(`rangeRef`, `hidden`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: [src/tasks/setRowHidden.ts:17](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/setRowHidden.ts#L17)

Set one or more rows visibility.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rangeRef` | [`WorkbookRangeRef`](WorkbookRange-1.md#workbookrangeref) | Reference to the workbook range representing the rows to hide or show. |
| `hidden` | `boolean` | Boolean indicating whether to hide (`true`) or show (`false`) the rows. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

The updated workbook range.
