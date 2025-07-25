[Microsoft Graph SDK](README.md) / refreshWorkbookSession

# refreshWorkbookSession

Refresh a workbook session.

## Functions

### refreshWorkbookSession()

> **refreshWorkbookSession**(`workbookRef`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/workbookSession/refreshWorkbookSession.ts:19](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookSession/refreshWorkbookSession.ts#L19)

Refresh a workbook session.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `workbookRef` | [`WorkbookRef`](Workbook.md#workbookref) | Reference to the workbook. * |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`void`\>

#### Throws

[InvalidArgumentError](InvalidArgumentError.md) if the session ID is not provided.

#### See

https://learn.microsoft.com/en-us/graph/api/workbook-refreshsession
