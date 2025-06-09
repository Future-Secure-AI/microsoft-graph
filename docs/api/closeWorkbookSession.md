[Microsoft Graph SDK](README.md) / closeWorkbookSession

# closeWorkbookSession

Close an existing workbook session.

## Functions

### closeWorkbookSession()

> **closeWorkbookSession**(`workbookRef`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/workbookSession/closeWorkbookSession.ts:20](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookSession/closeWorkbookSession.ts#L20)

Close an existing workbook session.

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

https://learn.microsoft.com/en-us/graph/api/workbook-closesession
