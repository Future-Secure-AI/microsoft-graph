[Microsoft Graph SDK](README.md) / iterateSites

# iterateSites

List sites in your company geography as an async iterable.

## Functions

### iterateSites()

> **iterateSites**(`contextRef`, `maxPerChunk`): [`AsyncGenerator`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator)\<`Site` & [`SiteRef`](Site-1.md#siteref)\>

Defined in: [src/tasks/iterateSites.ts:19](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/iterateSites.ts#L19)

List sites in your company geography as an async iterable.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `contextRef` | [`ContextRef`](Context-1.md#contextref) | `undefined` | Reference to the context. |
| `maxPerChunk` | `number` | `1000` | Number of items to fetch per request. DO NOT SET EXCEPT FOR ADVANCED TUNING. |

#### Returns

[`AsyncGenerator`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator)\<`Site` & [`SiteRef`](Site-1.md#siteref)\>

Async iterable of sites.

#### Remarks

`pageSize` should only be set for advanced performance tuning.
