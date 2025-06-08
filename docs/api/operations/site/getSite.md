[Microsoft Graph SDK](../../modules.md) / operations/site/getSite

## Functions

### getSite()

> **getSite**(`siteRef`): [`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`Site` & [`SiteRef`](../../models/SiteRef.md#siteref)\>

Defined in: [src/operations/site/getSite.ts:14](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/operations/site/getSite.ts#L14)

Retrieve properties for a site resource.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `siteRef` | [`SiteRef`](../../models/SiteRef.md#siteref) | A reference to the site. |

#### Returns

[`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`Site` & [`SiteRef`](../../models/SiteRef.md#siteref)\>

The specified site, including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/site-get
