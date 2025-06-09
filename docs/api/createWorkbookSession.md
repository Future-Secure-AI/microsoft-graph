[Microsoft Graph SDK](README.md) / createWorkbookSession

# createWorkbookSession

Create a new workbook session.

## Functions

### createWorkbookSession()

> **createWorkbookSession**(`itemRef`, `persistChanges`): [`GraphOperation`](GraphOperation.md#graphoperation)\<[`WorkbookRef`](WorkbookRef.md#workbookref)\>

Defined in: [src/operations/workbookSession/createWorkbookSession.ts:22](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookSession/createWorkbookSession.ts#L22)

Create a new workbook session.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `itemRef` | [`DriveItemRef`](DriveItemRef.md#driveitemref) | `undefined` | Reference to the workbook item. |
| `persistChanges` | `boolean` | `true` | Boolean indicating whether changes should persist across sessions. Defaults to true. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<[`WorkbookRef`](WorkbookRef.md#workbookref)\>

Reference to the workbook, including the session ID.

#### See

 - https://learn.microsoft.com/en-us/graph/api/workbook-createsession
 - https://learn.microsoft.com/en-us/graph/api/resources/excel#usage
