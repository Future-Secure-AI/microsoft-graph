[Microsoft Graph SDK](README.md) / iterateDriveItems

# iterateDriveItems

List drive items in a drive or a drive item.

## Functions

### iterateDriveItems()

> **iterateDriveItems**(`parentRef`, `maxPerChunk`): [`AsyncGenerator`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator)\<`DriveItem` & [`SiteRef`](Site-1.md#siteref) & `object` & `object`\>

Defined in: src/tasks/iterateDriveItems.ts:21

List drive items in a drive or a drive item as an async iterable.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `parentRef` | [`DriveRef`](Drive-1.md#driveref) \| [`DriveItemRef`](DriveItem-1.md#driveitemref) | `undefined` | Parent drive or folder reference. |
| `maxPerChunk` | `number` | `1000` | Number of items to fetch per request. DO NOT SET EXCEPT FOR ADVANCED TUNING. |

#### Returns

[`AsyncGenerator`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator)\<`DriveItem` & [`SiteRef`](Site-1.md#siteref) & `object` & `object`\>

Async iterable of drive items.

#### Remarks

`pageSize` should only be set for advanced performance tuning.
