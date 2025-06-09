[Microsoft Graph SDK](README.md) / safeDeleteWorkbook

Safely delete a workbook by first closing any open sessions and then deleting it.

## Functions

### safeDeleteWorkbook()

> **safeDeleteWorkbook**(`workbookRef`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: [src/tasks/safeDeleteWorkbook.ts:19](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/safeDeleteWorkbook.ts#L19)

Safely delete a workbook by first closing any open sessions and then deleting it.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `workbookRef` | [`WorkbookRef`](WorkbookRef.md#workbookref) | A reference to the workbook to be deleted. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Void when the workbook is successfully deleted.

#### Remarks

Back-off retry to allow for any lingering locks to be closed.

#### See

https://github.com/Future-Secure-AI/microsoft-graph/blob/main/docs/lockedWorkbook.md
