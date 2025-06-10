[Microsoft Graph SDK](README.md) / createWorkbookAndStartSession

# createWorkbookAndStartSession

Create a new workbook and open a session for that workbook.

## Functions

### createWorkbookAndStartSession()

> **createWorkbookAndStartSession**(`parentRef`, `itemPath`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`Workbook` & [`SiteRef`](Site-1.md#siteref) & `object` & `object` & `object`\>

Defined in: [src/tasks/createWorkbookAndStartSession.ts:21](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/createWorkbookAndStartSession.ts#L21)

Create a new workbook and open a session for that workbook/

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `parentRef` | [`DriveRef`](Drive-1.md#driveref) \| [`DriveItemRef`](DriveItem-1.md#driveitemref) | Reference to the drive or driveItem where the workbook will be created. |
| `itemPath` | [`DriveItemPath`](DriveItem-1.md#driveitempath) | The path of the new workbook within the drive. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`Workbook` & [`SiteRef`](Site-1.md#siteref) & `object` & `object` & `object`\>

The created workbook and session details.
