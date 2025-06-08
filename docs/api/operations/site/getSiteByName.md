[Microsoft Graph SDK](../../README.md) / operations/site/getSiteByName

## Functions

### getSiteByName()

> **getSiteByName**(`contextRef`, `hostName`, `siteName`): [`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`Site` & [`SiteRef`](../../models/SiteRef.md#siteref)\>

Defined in: [src/operations/site/getSiteByName.ts:21](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/site/getSiteByName.ts#L21)

Get a site by its name.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `contextRef` | [`ContextRef`](../../models/ContextRef.md#contextref) | A reference to the context. |
| `hostName` | [`HostName`](../../models/HostName.md#hostname) | The host name of the site. |
| `siteName` | [`SiteName`](../../models/SiteName.md#sitename) | The name of the site. |

#### Returns

[`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`Site` & [`SiteRef`](../../models/SiteRef.md#siteref)\>

The specified site, including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/site-getbypath
