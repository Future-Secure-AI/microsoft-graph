[Microsoft Graph SDK](README.md) / tryCloseWorkbookSession

# tryCloseWorkbookSession

Try and close a workbook session.

## Functions

### tryCloseWorkbookSession()

> **tryCloseWorkbookSession**(`workbookRef`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`boolean`\>

Defined in: [src/tasks/tryCloseWorkbookSession.ts:15](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/tryCloseWorkbookSession.ts#L15)

Try and close a workbook session.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `workbookRef` | [`WorkbookRef`](Workbook.md#workbookref) | Reference to the workbook. The session ID is required. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`boolean`\>

If the session was closed, false if it was not possible to close the session.

#### Remarks

Does not error if the session is already closed or expired.
