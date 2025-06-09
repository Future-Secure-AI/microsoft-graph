[Microsoft Graph SDK](../README.md) / tasks/safeDeleteWorkbook

## Functions

### safeDeleteWorkbook()

> **safeDeleteWorkbook**(`workbookRef`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: [src/tasks/safeDeleteWorkbook.ts:12](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/safeDeleteWorkbook.ts#L12)

Safely delete a workbook by first closing any open sessions and then deleting it with a back-off retry to allow for any outstanding locks to be closed.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `workbookRef` | [`WorkbookRef`](../WorkbookRef.md#workbookref) | A reference to the workbook to be deleted. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Void when the workbook is successfully deleted.

#### See

https://github.com/Future-Secure-AI/microsoft-graph/blob/main/docs/lockedWorkbook.md
