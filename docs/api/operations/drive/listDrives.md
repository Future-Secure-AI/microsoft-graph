[Microsoft Graph SDK](../../modules.md) / operations/drive/listDrives

## Functions

### listDrives()

> **listDrives**(`siteRef`): [`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`DriveItem` & [`SiteRef`](../../models/SiteRef.md#siteref) & `object`[]\>

Defined in: [src/operations/drive/listDrives.ts:17](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/operations/drive/listDrives.ts#L17)

Retrieve the list of accessible Drives in a Site.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `siteRef` | [`SiteRef`](../../models/SiteRef.md#siteref) | A reference to the site. |

#### Returns

[`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`DriveItem` & [`SiteRef`](../../models/SiteRef.md#siteref) & `object`[]\>

An array of drives available for the specified site, each including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/drive-list
