[Microsoft Graph SDK](../../README.md) / operations/workbookSession/createWorkbookSession

## Functions

### createWorkbookSession()

> **createWorkbookSession**(`itemRef`, `persistChanges`): [`GraphOperation`](../../GraphOperation.md#graphoperation)\<[`WorkbookRef`](../../WorkbookRef.md#workbookref)\>

Defined in: [src/operations/workbookSession/createWorkbookSession.ts:17](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookSession/createWorkbookSession.ts#L17)

Create a new workbook session.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `itemRef` | [`DriveItemRef`](../../DriveItemRef.md#driveitemref) | `undefined` | A reference to the workbook item, optionally including session information. |
| `persistChanges` | `boolean` | `true` | A boolean indicating whether changes should persist across sessions. Defaults to true. |

#### Returns

[`GraphOperation`](../../GraphOperation.md#graphoperation)\<[`WorkbookRef`](../../WorkbookRef.md#workbookref)\>

A reference to the workbook, including the session ID.

#### See

 - https://learn.microsoft.com/en-us/graph/api/workbook-createsession
 - https://learn.microsoft.com/en-us/graph/api/resources/excel#usage
