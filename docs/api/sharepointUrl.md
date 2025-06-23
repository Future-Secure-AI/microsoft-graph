[Microsoft Graph SDK](README.md) / sharepointUrl

# sharepointUrl

Utilities for parsing and extracting information from SharePoint URLs.

## Functions

### parseSharepointUrl()

> **parseSharepointUrl**(`urlString`): `SharepointUrlComponents`

Defined in: [src/services/sharepointUrl.ts:25](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/sharepointUrl.ts#L25)

Parses a SharePoint document URL string to extract the site name, host name, drive name and item ID if present.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `urlString` | `string` | SharePoint URL as a string. |

#### Returns

`SharepointUrlComponents`

An object containing the host name, site name, drive name (if present), and item ID (if present).

#### Throws

InvalidArgumentError if the URL is invalid or required components are missing.
