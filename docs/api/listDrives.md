[Microsoft Graph SDK](README.md) / listDrives

# listDrives

Retrieve the list of accessible Drives in a Site.

## Functions

### listDrives()

> **listDrives**(`siteRef`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`DriveItem` & [`SiteRef`](Site-1.md#siteref) & `object`[]\>

Defined in: [src/operations/drive/listDrives.ts:21](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/drive/listDrives.ts#L21)

Retrieve the list of accessible Drives in a Site.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `siteRef` | [`SiteRef`](Site-1.md#siteref) | Reference to the site. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`DriveItem` & [`SiteRef`](Site-1.md#siteref) & `object`[]\>

Array of drives available for the specified site, each including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/drive-list
