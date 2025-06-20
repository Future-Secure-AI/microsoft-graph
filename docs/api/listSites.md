[Microsoft Graph SDK](README.md) / listSites

# listSites

List sites in your company geography.

## Type Aliases

### ListSitesResponse

> **ListSitesResponse** = `object`

Defined in: [src/operations/site/listSites.ts:15](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/site/listSites.ts#L15)

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="odatanextlink"></a> `@odata.nextLink` | `string` \| `null` | [src/operations/site/listSites.ts:17](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/site/listSites.ts#L17) |
| <a id="value"></a> `value` | `Site` & [`SiteRef`](Site-1.md#siteref)[] | [src/operations/site/listSites.ts:16](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/site/listSites.ts#L16) |

***

### SiteList

> **SiteList** = `object`

Defined in: [src/operations/site/listSites.ts:20](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/site/listSites.ts#L20)

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="nextlink"></a> `nextLink` | [`URL`](https://developer.mozilla.org/docs/Web/API/URL) \| `null` | [src/operations/site/listSites.ts:22](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/site/listSites.ts#L22) |
| <a id="sites"></a> `sites` | `Site` & [`SiteRef`](Site-1.md#siteref)[] | [src/operations/site/listSites.ts:21](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/site/listSites.ts#L21) |

## Functions

### listSites()

> **listSites**(`contextRef`, `take`): [`GraphOperation`](GraphOperation.md#graphoperation)\<[`SiteList`](#sitelist)\>

Defined in: [src/operations/site/listSites.ts:32](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/site/listSites.ts#L32)

List sites in your company geography.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `contextRef` | [`ContextRef`](Context-1.md#contextref) | `undefined` | Reference to the context. |
| `take` | `number` | `1000` | Maximum number of items to retrieve. Defaults to 1000. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<[`SiteList`](#sitelist)\>

Array of sites, each including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/site-list
