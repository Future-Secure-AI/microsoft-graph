[Microsoft Graph SDK](README.md) / createWorkbookAndStartSession

Create a new workbook and open a session for that workbook.

## Functions

### createWorkbookAndStartSession()

> **createWorkbookAndStartSession**(`parentRef`, `itemPath`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`Workbook` & [`SiteRef`](SiteRef.md#siteref) & `object` & `object` & `object`\>

Defined in: [src/tasks/createWorkbookAndStartSession.ts:22](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/createWorkbookAndStartSession.ts#L22)

Create a new workbook and open a session for that workbook/

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `parentRef` | [`DriveRef`](DriveRef.md#driveref) \| [`DriveItemRef`](DriveItemRef.md#driveitemref) | Reference to the drive or driveItem where the workbook will be created. |
| `itemPath` | [`DriveItemPath`](DriveItemPath.md#driveitempath) | The path of the new workbook within the drive. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`Workbook` & [`SiteRef`](SiteRef.md#siteref) & `object` & `object` & `object`\>

The created workbook and session details.
