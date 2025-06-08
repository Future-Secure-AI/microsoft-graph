[Microsoft Graph SDK](../README.md) / tasks/createWorkbookAndStartSession

## Functions

### createWorkbookAndStartSession()

> **createWorkbookAndStartSession**(`parentRef`, `itemPath`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`Workbook` & [`SiteRef`](../models/SiteRef.md#siteref) & `object` & `object` & `object`\>

Defined in: [src/tasks/createWorkbookAndStartSession.ts:16](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/createWorkbookAndStartSession.ts#L16)

Create a new workbook and open a session for that workbook in a single operation.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `parentRef` | [`DriveRef`](../models/DriveRef.md#driveref) \| [`DriveItemRef`](../models/DriveItemRef.md#driveitemref) | A reference to the drive or driveItem where the workbook will be created. |
| `itemPath` | [`DriveItemPath`](../models/DriveItemPath.md#driveitempath) | The path of the new workbook within the drive. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`Workbook` & [`SiteRef`](../models/SiteRef.md#siteref) & `object` & `object` & `object`\>

The created workbook and session details.
