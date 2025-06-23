[Microsoft Graph SDK](README.md) / getDriveFromUrl

# getDriveFromUrl

Retrieves a Drive from a SharePoint URL.

## Functions

### getDriveFromUrl()

> **getDriveFromUrl**(`contextRef`, `url`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`Drive` & [`SiteRef`](Site-1.md#siteref) & `object`\>

Defined in: [src/tasks/getDriveFromUrl.ts:24](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/getDriveFromUrl.ts#L24)

Retrieves a Drive from a SharePoint URL.

Parses the given SharePoint URL to extract the host, site, and drive names, then locates and returns the corresponding Drive object.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `contextRef` | [`ContextRef`](Context-1.md#contextref) | The context reference containing authentication and environment information. |
| `url` | `string` | The SharePoint URL pointing to the drive. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`Drive` & [`SiteRef`](Site-1.md#siteref) & `object`\>

A Promise that resolves to the Drive object with additional DriveRef properties.

#### Throws

If the URL is invalid or the drive cannot be found.
