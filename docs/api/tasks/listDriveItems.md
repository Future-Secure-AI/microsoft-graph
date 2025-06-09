[Microsoft Graph SDK](../README.md) / tasks/listDriveItems

## Functions

### listDriveItems()

> **listDriveItems**(`parentRef`, `pageSize`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`DriveItem` & [`SiteRef`](../SiteRef.md#siteref) & `object` & `object`[]\>

Defined in: [src/tasks/listDriveItems.ts:9](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/listDriveItems.ts#L9)

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `parentRef` | [`DriveRef`](../DriveRef.md#driveref) \| [`DriveItemRef`](../DriveItemRef.md#driveitemref) | `undefined` |
| `pageSize` | `number` | `1000` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`DriveItem` & [`SiteRef`](../SiteRef.md#siteref) & `object` & `object`[]\>
