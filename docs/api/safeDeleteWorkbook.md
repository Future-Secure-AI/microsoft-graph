[Microsoft Graph SDK](README.md) / safeDeleteWorkbook

# safeDeleteWorkbook

Safely delete a workbook by first closing any open sessions and then deleting it.

## Functions

### safeDeleteWorkbook()

> **safeDeleteWorkbook**(`workbookRef`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: [src/tasks/safeDeleteWorkbook.ts:18](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/safeDeleteWorkbook.ts#L18)

Safely delete a workbook by first closing any open sessions and then deleting it.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `workbookRef` | [`WorkbookRef`](Workbook.md#workbookref) | Reference to the workbook to be deleted. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Void when the workbook is successfully deleted.

#### See

https://github.com/Future-Secure-AI/microsoft-graph/blob/main/docs/lockedWorkbook.md
