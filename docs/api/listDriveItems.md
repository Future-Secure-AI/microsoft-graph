[Microsoft Graph SDK](README.md) / listDriveItems

# listDriveItems

List drive items in a drive or a drive item.

## Functions

### listDriveItems()

> **listDriveItems**(`parentRef`, `pageSize`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`DriveItem` & [`SiteRef`](Site-1.md#siteref) & `object` & `object`[]\>

Defined in: [src/tasks/listDriveItems.ts:21](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/listDriveItems.ts#L21)

List drive items in a drive or a drive item.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `parentRef` | [`DriveRef`](Drive-1.md#driveref) \| [`DriveItemRef`](DriveItem-1.md#driveitemref) | `undefined` | Parent drive or folder reference. |
| `pageSize` | `number` | `1000` | Number of items to fetch per request. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`DriveItem` & [`SiteRef`](Site-1.md#siteref) & `object` & `object`[]\>

#### Remarks

`pageSize` should only be set for advanced performance tuning.
