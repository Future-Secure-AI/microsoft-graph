[Microsoft Graph SDK](README.md) / sharepointUrl

# sharepointUrl

Utilities for parsing and extracting information from SharePoint URLs.

## Type Aliases

### SharepointUrlComponents

> **SharepointUrlComponents** = `object`

Defined in: [src/services/sharepointUrl.ts:12](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/sharepointUrl.ts#L12)

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="drivename"></a> `driveName` | [`DriveName`](Drive-1.md#drivename) \| `null` | [src/services/sharepointUrl.ts:15](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/sharepointUrl.ts#L15) |
| <a id="hostname"></a> `hostName` | [`HostName`](HostName.md#hostname) \| `null` | [src/services/sharepointUrl.ts:13](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/sharepointUrl.ts#L13) |
| <a id="itemid"></a> `itemId` | [`DriveItemId`](DriveItem-1.md#driveitemid) \| `null` | [src/services/sharepointUrl.ts:16](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/sharepointUrl.ts#L16) |
| <a id="sitename"></a> `siteName` | [`SiteName`](Site-1.md#sitename) \| `null` | [src/services/sharepointUrl.ts:14](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/sharepointUrl.ts#L14) |

## Functions

### parseSharepointUrl()

> **parseSharepointUrl**(`urlString`): [`SharepointUrlComponents`](#sharepointurlcomponents)

Defined in: [src/services/sharepointUrl.ts:24](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/sharepointUrl.ts#L24)

Parses a SharePoint document URL string to extract the site name, host name, drive name and item ID if present.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `urlString` | `string` | SharePoint URL as a string. |

#### Returns

[`SharepointUrlComponents`](#sharepointurlcomponents)

An object containing the host name, site name, drive name, and item ID. Parameters are omitted if not found.
