[Microsoft Graph SDK](README.md) / searchSites

# searchSites

Find accessible sites that match the provided keywords.

## Type Aliases

### SearchSitesResponse

> **SearchSitesResponse** = `object`

Defined in: [src/operations/site/searchSites.ts:15](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/site/searchSites.ts#L15)

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="odatanextlink"></a> `@odata.nextLink?` | `string` | [src/operations/site/searchSites.ts:17](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/site/searchSites.ts#L17) |
| <a id="value"></a> `value` | `Site`[] | [src/operations/site/searchSites.ts:16](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/site/searchSites.ts#L16) |

***

### SiteList

> **SiteList** = `object`

Defined in: [src/operations/site/searchSites.ts:20](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/site/searchSites.ts#L20)

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="nextlink"></a> `nextLink` | [`URL`](https://developer.mozilla.org/docs/Web/API/URL) \| `null` | [src/operations/site/searchSites.ts:22](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/site/searchSites.ts#L22) |
| <a id="sites"></a> `sites` | `Site` & [`SiteRef`](Site-1.md#siteref)[] | [src/operations/site/searchSites.ts:21](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/site/searchSites.ts#L21) |

## Functions

### searchSites()

> **searchSites**(`contextRef`, `search`): [`GraphOperation`](GraphOperation.md#graphoperation)\<[`SiteList`](#sitelist)\>

Defined in: [src/operations/site/searchSites.ts:32](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/site/searchSites.ts#L32)

Find accessible sites that match the provided keywords.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `contextRef` | [`ContextRef`](Context-1.md#contextref) | Reference to the context. |
| `search` | `string` | Search keywords to find matching sites. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<[`SiteList`](#sitelist)\>

Object containing array of sites and nextLink, each including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/site-search
