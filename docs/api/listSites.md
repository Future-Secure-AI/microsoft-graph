[Microsoft Graph SDK](README.md) / listSites

List accessible sites.

## Functions

### listSites()

> **listSites**(`contextRef`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`Site` & [`SiteRef`](SiteRef.md#siteref)[]\>

Defined in: [src/operations/site/listSites.ts:22](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/site/listSites.ts#L22)

List accessible sites.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `contextRef` | [`ContextRef`](ContextRef.md#contextref) | Reference to the context. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`Site` & [`SiteRef`](SiteRef.md#siteref)[]\>

Array of sites, each including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/site-list
