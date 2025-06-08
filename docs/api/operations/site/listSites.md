[Microsoft Graph SDK](../../modules.md) / operations/site/listSites

## Functions

### listSites()

> **listSites**(`contextRef`): [`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`Site` & [`SiteRef`](../../models/SiteRef.md#siteref)[]\>

Defined in: [src/operations/site/listSites.ts:17](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/operations/site/listSites.ts#L17)

List accessible sites.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `contextRef` | [`ContextRef`](../../models/ContextRef.md#contextref) | A reference to the context. |

#### Returns

[`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`Site` & [`SiteRef`](../../models/SiteRef.md#siteref)[]\>

An array of sites, each including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/site-list
