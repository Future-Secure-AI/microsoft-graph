[Microsoft Graph SDK](../README.md) / tasks/getSiteByUrl

# tasks/getSiteByUrl

## Functions

### getSiteByUrl()

> **getSiteByUrl**(`contextRef`, `url`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`Site` & [`SiteRef`](../Site-1.md#siteref)\>

Defined in: src/tasks/getSiteByUrl.ts:15

Retrieves a site from a SharePoint URL.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `contextRef` | [`ContextRef`](../Context-1.md#contextref) | Context reference containing authentication and environment information. |
| `url` | `string` | SharePoint URL pointing to the site. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`Site` & [`SiteRef`](../Site-1.md#siteref)\>

A Promise that resolves to the Site object

#### Throws

If the URL is invalid or the site cannot be found.
