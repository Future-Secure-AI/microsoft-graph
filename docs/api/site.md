[Microsoft Graph SDK](README.md) / site

# site

Utilities for working with Microsoft Graph Site references and operations.

## Functions

### createSiteRef()

> **createSiteRef**(`contextRef`, `siteId`): [`SiteRef`](Site-1.md#siteref)

Defined in: [src/services/site.ts:20](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/site.ts#L20)

Creates a reference to a site.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `contextRef` | [`ContextRef`](Context-1.md#contextref) | The reference to the context. |
| `siteId` | `undefined` \| [`SiteId`](Site-1.md#siteid) | The ID of the site. |

#### Returns

[`SiteRef`](Site-1.md#siteref)

A reference to the site.

#### Throws

ProtocolError if the site ID is missing.

***

### getDefaultSiteRef()

> **getDefaultSiteRef**(): [`SiteRef`](Site-1.md#siteref)

Defined in: [src/services/site.ts:36](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/site.ts#L36)

Retrieves the opinionated default site reference. NOT RECOMMENDED FOR PRODUCTION USE

#### Returns

[`SiteRef`](Site-1.md#siteref)

A reference to the default site.

#### Remarks

This method is opinionated and not recommended for production use.
