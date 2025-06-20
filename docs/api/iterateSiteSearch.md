[Microsoft Graph SDK](README.md) / iterateSiteSearch

# iterateSiteSearch

Iterate accessible sites matching the provided search keywords as an async iterable.

## Functions

### iterateSiteSearch()

> **iterateSiteSearch**(`contextRef`, `search`): [`AsyncGenerator`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator)\<`Site` & [`SiteRef`](Site-1.md#siteref)\>

Defined in: src/tasks/iterateSiteSearch.ts:18

Iterate accessible sites matching the provided search keywords as an async iterable.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `contextRef` | [`ContextRef`](Context-1.md#contextref) | Reference to the context. |
| `search` | `string` | Search keywords to find matching sites. |

#### Returns

[`AsyncGenerator`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator)\<`Site` & [`SiteRef`](Site-1.md#siteref)\>

Async iterable of sites.
