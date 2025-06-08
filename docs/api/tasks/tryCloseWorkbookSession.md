[Microsoft Graph SDK](../modules.md) / tasks/tryCloseWorkbookSession

## Functions

### tryCloseWorkbookSession()

> **tryCloseWorkbookSession**(`workbookRef`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`boolean`\>

Defined in: [src/tasks/tryCloseWorkbookSession.ts:10](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/tasks/tryCloseWorkbookSession.ts#L10)

Try and close a workbook session. Do not error if not possible

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `workbookRef` | [`WorkbookRef`](../models/WorkbookRef.md#workbookref) | A reference to the workbook, optionally including session information. The session ID is required. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`boolean`\>

true if the session was closed, false if it was not possible to close the session.
