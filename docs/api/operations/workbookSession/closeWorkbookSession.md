[Microsoft Graph SDK](../../modules.md) / operations/workbookSession/closeWorkbookSession

## Functions

### closeWorkbookSession()

> **closeWorkbookSession**(`workbookRef`): [`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/workbookSession/closeWorkbookSession.ts:15](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/operations/workbookSession/closeWorkbookSession.ts#L15)

Close an existing workbook session.

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

https://learn.microsoft.com/en-us/graph/api/workbook-closesession
