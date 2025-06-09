[Microsoft Graph SDK](README.md) / searchSites

# searchSites

Find accessible sites that match the provided keywords.

## Functions

### searchSites()

> **searchSites**(`contextRef`, `search`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`Site` & [`SiteRef`](SiteRef.md#siteref)[]\>

Defined in: [src/operations/site/searchSites.ts:23](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/site/searchSites.ts#L23)

Find accessible sites that match the provided keywords.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `contextRef` | [`ContextRef`](ContextRef.md#contextref) | Reference to the context. |
| `search` | `string` | Search keywords to find matching sites. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`Site` & [`SiteRef`](SiteRef.md#siteref)[]\>

Array of sites that match the search criteria, each including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/site-search
