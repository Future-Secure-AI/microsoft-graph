[Microsoft Graph SDK](../../README.md) / operations/workbookSession/refreshWorkbookSession

## Functions

### refreshWorkbookSession()

> **refreshWorkbookSession**(`workbookRef`): [`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/workbookSession/refreshWorkbookSession.ts:15](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookSession/refreshWorkbookSession.ts#L15)

Refresh a workbook session.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `workbookRef` | [`WorkbookRef`](../../models/WorkbookRef.md#workbookref) | A reference to the workbook, optionally including session information. The session ID is required. |

#### Returns

[`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`void`\>

Nothing.

#### Throws

InvalidArgumentError if the session ID is not provided.

#### See

https://learn.microsoft.com/en-us/graph/api/workbook-refreshsession
