[Microsoft Graph SDK](README.md) / iterateDrives

# iterateDrives

List drives in a site as an async iterable.

## Functions

### iterateDrives()

> **iterateDrives**(`siteRef`, `maxPerChunk`): [`AsyncGenerator`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator)\<`DriveItem` & [`SiteRef`](Site-1.md#siteref) & `object`\>

Defined in: src/tasks/iterateDrives.ts:19

List drives in a site as an async iterable.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `siteRef` | [`SiteRef`](Site-1.md#siteref) | `undefined` | Reference to the site. |
| `maxPerChunk` | `number` | `1000` | Number of items to fetch per request. DO NOT SET EXCEPT FOR ADVANCED TUNING. |

#### Returns

[`AsyncGenerator`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator)\<`DriveItem` & [`SiteRef`](Site-1.md#siteref) & `object`\>

Async iterable of drives.

#### Remarks

`pageSize` should only be set for advanced performance tuning.
