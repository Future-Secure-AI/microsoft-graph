[Microsoft Graph SDK](../../README.md) / operations/site/listSites

## Functions

### listSites()

> **listSites**(`contextRef`): [`GraphOperation`](../../GraphOperation.md#graphoperation)\<`Site` & [`SiteRef`](../../SiteRef.md#siteref)[]\>

Defined in: [src/operations/site/listSites.ts:17](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/site/listSites.ts#L17)

List accessible sites.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `contextRef` | [`ContextRef`](../../ContextRef.md#contextref) | A reference to the context. |

#### Returns

[`GraphOperation`](../../GraphOperation.md#graphoperation)\<`Site` & [`SiteRef`](../../SiteRef.md#siteref)[]\>

An array of sites, each including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/site-list
