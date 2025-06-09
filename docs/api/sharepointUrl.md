[Microsoft Graph SDK](README.md) / sharepointUrl

# sharepointUrl

Utilities for parsing and extracting information from SharePoint URLs.

## Functions

### parseSharepointUrl()

> **parseSharepointUrl**(`url`): `object`

Defined in: [src/services/sharepointUrl.ts:18](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/sharepointUrl.ts#L18)

Parses a SharePoint document URL to extract the site name, host name, and item ID.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `url` | [`URL`](https://developer.mozilla.org/docs/Web/API/URL) | The SharePoint document URL. |

#### Returns

`object`

An object containing the host name, site name, and item ID.

##### hostName

> **hostName**: [`HostName`](HostName.md#hostname)

##### itemId

> **itemId**: [`DriveItemId`](DriveItemId.md#driveitemid)

##### siteName

> **siteName**: [`SiteName`](SiteName.md#sitename)

#### Throws

InvalidArgumentError if the URL is invalid or required components are missing.
