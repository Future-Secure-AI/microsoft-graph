[Microsoft Graph SDK](README.md) / listDriveItems

# listDriveItems

Retrieve the metadata for items in a drive or folder.

## Type Aliases

### DriveItemList

> **DriveItemList** = `object`

Defined in: [src/operations/driveItem/listDriveItems.ts:20](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/driveItem/listDriveItems.ts#L20)

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="items"></a> `items` | `DriveItem` & [`DriveItemRef`](DriveItem-1.md#driveitemref)[] | [src/operations/driveItem/listDriveItems.ts:21](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/driveItem/listDriveItems.ts#L21) |
| <a id="nextlink"></a> `nextLink` | [`URL`](https://developer.mozilla.org/docs/Web/API/URL) \| `null` | [src/operations/driveItem/listDriveItems.ts:22](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/driveItem/listDriveItems.ts#L22) |

***

### ListDriveItemResponse

> **ListDriveItemResponse** = `object`

Defined in: [src/operations/driveItem/listDriveItems.ts:15](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/driveItem/listDriveItems.ts#L15)

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="odatanextlink"></a> `@odata.nextLink` | `string` \| `null` | [src/operations/driveItem/listDriveItems.ts:17](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/driveItem/listDriveItems.ts#L17) |
| <a id="value"></a> `value` | `DriveItem` & [`DriveItemRef`](DriveItem-1.md#driveitemref)[] | [src/operations/driveItem/listDriveItems.ts:16](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/driveItem/listDriveItems.ts#L16) |

## Functions

### listDriveItems()

> **listDriveItems**(`parentRef`, `take`): [`GraphOperation`](GraphOperation.md#graphoperation)\<[`DriveItemList`](#driveitemlist)\>

Defined in: [src/operations/driveItem/listDriveItems.ts:32](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/driveItem/listDriveItems.ts#L32)

Retrieve the metadata for items in a drive or folder.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `parentRef` | [`DriveRef`](Drive-1.md#driveref) \| [`DriveItemRef`](DriveItem-1.md#driveitemref) | `undefined` | Reference to the parent drive or folder. Defaults to the root drive. |
| `take` | `number` | `1000` | Maximum number of items to retrieve. Defaults to 1000. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<[`DriveItemList`](#driveitemlist)\>

Array of drive items, each including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/driveitem-list-children
