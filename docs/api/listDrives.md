[Microsoft Graph SDK](README.md) / listDrives

# listDrives

Retrieve the list of accessible Drives in a Site.

## Type Aliases

### DriveList

> **DriveList** = `object`

Defined in: [src/operations/drive/listDrives.ts:20](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/drive/listDrives.ts#L20)

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="drives"></a> `drives` | `Drive` & [`DriveRef`](Drive-1.md#driveref)[] | [src/operations/drive/listDrives.ts:21](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/drive/listDrives.ts#L21) |
| <a id="nextlink"></a> `nextLink` | [`URL`](https://developer.mozilla.org/docs/Web/API/URL) \| `null` | [src/operations/drive/listDrives.ts:22](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/drive/listDrives.ts#L22) |

***

### ListDrivesResponse

> **ListDrivesResponse** = `object`

Defined in: [src/operations/drive/listDrives.ts:15](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/drive/listDrives.ts#L15)

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="odatanextlink"></a> `@odata.nextLink` | `string` \| `null` | [src/operations/drive/listDrives.ts:17](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/drive/listDrives.ts#L17) |
| <a id="value"></a> `value` | `DriveItem` & [`DriveRef`](Drive-1.md#driveref)[] | [src/operations/drive/listDrives.ts:16](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/drive/listDrives.ts#L16) |

## Functions

### listDrives()

> **listDrives**(`siteRef`, `take`): [`GraphOperation`](GraphOperation.md#graphoperation)\<[`DriveList`](#drivelist)\>

Defined in: [src/operations/drive/listDrives.ts:32](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/drive/listDrives.ts#L32)

Retrieve the list of accessible Drives in a Site.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `siteRef` | [`SiteRef`](Site-1.md#siteref) | `undefined` | Reference to the site. |
| `take` | `number` | `1000` | Maximum number of items to retrieve. Defaults to 1000. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<[`DriveList`](#drivelist)\>

Array of drives available for the specified site, each including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/drive-list
