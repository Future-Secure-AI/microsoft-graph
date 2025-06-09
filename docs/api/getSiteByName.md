[Microsoft Graph SDK](README.md) / getSiteByName

Get a site by its name.

## Functions

### getSiteByName()

> **getSiteByName**(`contextRef`, `hostName`, `siteName`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`Site` & [`SiteRef`](SiteRef.md#siteref)\>

Defined in: [src/operations/site/getSiteByName.ts:26](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/site/getSiteByName.ts#L26)

Get a site by its name.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `contextRef` | [`ContextRef`](ContextRef.md#contextref) | Reference to the context. |
| `hostName` | [`HostName`](HostName.md#hostname) | Host name of the site. |
| `siteName` | [`SiteName`](SiteName.md#sitename) | Name of the site. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`Site` & [`SiteRef`](SiteRef.md#siteref)\>

The specified site.

#### See

https://learn.microsoft.com/en-us/graph/api/site-getbypath
