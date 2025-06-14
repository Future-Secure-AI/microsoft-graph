[Microsoft Graph SDK](README.md) / listDriveItemChildren

# listDriveItemChildren

Retrieve the metadata for items in a drive or folder.

## Type Aliases

### ListDriveItemResponse

> **ListDriveItemResponse** = `object`

Defined in: [src/operations/driveItem/listDriveItemChildren.ts:15](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/driveItem/listDriveItemChildren.ts#L15)

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="odatanextlink"></a> `@odata.nextLink` | `string` \| `null` | [src/operations/driveItem/listDriveItemChildren.ts:17](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/driveItem/listDriveItemChildren.ts#L17) |
| <a id="value"></a> `value` | `DriveItem` & [`DriveItemRef`](DriveItem-1.md#driveitemref)[] | [src/operations/driveItem/listDriveItemChildren.ts:16](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/driveItem/listDriveItemChildren.ts#L16) |

## Functions

### listDriveItemChildren()

> **listDriveItemChildren**(`parentRef`, `take`): [`GraphOperation`](GraphOperation.md#graphoperation)\<[`ListDriveItemResponse`](#listdriveitemresponse)\>

Defined in: [src/operations/driveItem/listDriveItemChildren.ts:27](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/driveItem/listDriveItemChildren.ts#L27)

Retrieve the metadata for items in a drive or folder.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `parentRef` | [`DriveRef`](Drive-1.md#driveref) \| [`DriveItemRef`](DriveItem-1.md#driveitemref) | `undefined` | Reference to the parent drive or folder. Defaults to the root drive. |
| `take` | `number` | `1000` | Maximum number of items to retrieve. Defaults to 1000. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<[`ListDriveItemResponse`](#listdriveitemresponse)\>

Array of drive items, each including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/driveitem-list-children
