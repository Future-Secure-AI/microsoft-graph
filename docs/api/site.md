[Microsoft Graph SDK](README.md) / site

Utilities for working with Microsoft Graph Site references and operations.

## Functions

### createSiteRef()

> **createSiteRef**(`contextRef`, `siteId`): [`SiteRef`](SiteRef.md#siteref)

Defined in: [src/services/site.ts:21](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/site.ts#L21)

Creates a reference to a site.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `contextRef` | [`ContextRef`](ContextRef.md#contextref) | The reference to the context. |
| `siteId` | `undefined` \| [`SiteId`](SiteId.md#siteid) | The ID of the site. |

#### Returns

[`SiteRef`](SiteRef.md#siteref)

A reference to the site.

#### Throws

ProtocolError if the site ID is missing.

***

### getDefaultSiteRef()

> **getDefaultSiteRef**(): [`SiteRef`](SiteRef.md#siteref)

Defined in: [src/services/site.ts:37](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/site.ts#L37)

Retrieves the opinionated default site reference. NOT RECOMMENDED FOR PRODUCTION USE

#### Returns

[`SiteRef`](SiteRef.md#siteref)

A reference to the default site.

#### Remarks

This method is opinionated and not recommended for production use.
