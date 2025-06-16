[Microsoft Graph SDK](README.md) / listSites

# listSites

List sites in your company geography.

## Functions

### listSites()

> **listSites**(`contextRef`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`Site` & [`SiteRef`](Site-1.md#siteref)[]\>

Defined in: [src/operations/site/listSites.ts:21](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/site/listSites.ts#L21)

List sites in your company geography.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `contextRef` | [`ContextRef`](Context-1.md#contextref) | Reference to the context. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`Site` & [`SiteRef`](Site-1.md#siteref)[]\>

Array of sites, each including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/site-list
