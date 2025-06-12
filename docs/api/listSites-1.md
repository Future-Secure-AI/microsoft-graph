[Microsoft Graph SDK](README.md) / listSites

# listSites

List sites in all company geographies.

## Functions

### listSitesAllGeographies()

> **listSitesAllGeographies**(`contextRef`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`Site` & [`SiteRef`](Site-1.md#siteref)[]\>

Defined in: src/operations/site/listSitesAllGeographies.ts:21

List sites in all company geographies.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `contextRef` | [`ContextRef`](Context-1.md#contextref) | Reference to the context. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`Site` & [`SiteRef`](Site-1.md#siteref)[]\>

Array of sites, each including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/site-getallsites
