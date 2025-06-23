[Microsoft Graph SDK](../README.md) / services/sharepointUrl

# services/sharepointUrl

## Type Aliases

### SharepointUrlComponents

> **SharepointUrlComponents** = `object`

Defined in: [src/services/sharepointUrl.ts:4](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/sharepointUrl.ts#L4)

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="hostname"></a> `hostName` | [`HostName`](../HostName.md#hostname) \| `null` | [src/services/sharepointUrl.ts:5](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/sharepointUrl.ts#L5) |
| <a id="sitename"></a> `siteName` | [`SiteName`](../Site-1.md#sitename) \| `null` | [src/services/sharepointUrl.ts:6](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/sharepointUrl.ts#L6) |

## Functions

### parseSharepointUrl()

> **parseSharepointUrl**(`urlString`): [`SharepointUrlComponents`](#sharepointurlcomponents)

Defined in: [src/services/sharepointUrl.ts:14](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/sharepointUrl.ts#L14)

Parses a SharePoint document URL string to extract the site name, host name, drive name and item ID if present.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `urlString` | `string` | SharePoint URL as a string. |

#### Returns

[`SharepointUrlComponents`](#sharepointurlcomponents)

An object containing the host name, site name, drive name, and item ID. Parameters are omitted if not found.
