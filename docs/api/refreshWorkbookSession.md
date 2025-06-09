[Microsoft Graph SDK](README.md) / refreshWorkbookSession

Refresh a workbook session.

## Functions

### refreshWorkbookSession()

> **refreshWorkbookSession**(`workbookRef`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/workbookSession/refreshWorkbookSession.ts:20](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookSession/refreshWorkbookSession.ts#L20)

Refresh a workbook session.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `workbookRef` | [`WorkbookRef`](WorkbookRef.md#workbookref) | Reference to the workbook. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`void`\>

Nothing.

#### Throws

[InvalidArgumentError](InvalidArgumentError.md) if the session ID is not provided.

#### See

https://learn.microsoft.com/en-us/graph/api/workbook-refreshsession
