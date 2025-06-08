[Microsoft Graph SDK](../../modules.md) / operations/driveItem/listDriveItemChildren

## Type Aliases

### ListDriveItemResponse

> **ListDriveItemResponse** = `object`

Defined in: [src/operations/driveItem/listDriveItemChildren.ts:10](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/operations/driveItem/listDriveItemChildren.ts#L10)

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="odatanextlink"></a> `@odata.nextLink` | `string` \| `null` | [src/operations/driveItem/listDriveItemChildren.ts:12](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/operations/driveItem/listDriveItemChildren.ts#L12) |
| <a id="value"></a> `value` | `DriveItem` & [`DriveItemRef`](../../models/DriveItemRef.md#driveitemref)[] | [src/operations/driveItem/listDriveItemChildren.ts:11](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/operations/driveItem/listDriveItemChildren.ts#L11) |

## Functions

### listDriveItemChildren()

> **listDriveItemChildren**(`parentRef`, `take`): [`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<[`ListDriveItemResponse`](#listdriveitemresponse)\>

Defined in: [src/operations/driveItem/listDriveItemChildren.ts:23](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/operations/driveItem/listDriveItemChildren.ts#L23)

Retrieve the metadata for items in a drive or folder.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `parentRef` | [`DriveRef`](../../models/DriveRef.md#driveref) \| [`DriveItemRef`](../../models/DriveItemRef.md#driveitemref) | `undefined` | A reference to the parent drive or folder. Defaults to the root drive. |
| `take` | `number` | `1000` | The maximum number of items to retrieve. Defaults to 1000. |

#### Returns

[`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<[`ListDriveItemResponse`](#listdriveitemresponse)\>

An array of drive items, each including its metadata and reference information.

#### See

https://learn.microsoft.com/en-us/graph/api/driveitem-list-children
