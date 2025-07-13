[Microsoft Graph SDK](README.md) / tryGetDriveItemByPath

# tryGetDriveItemByPath

Attempts to retrieve the metadata for an item in a drive by file path, returning null if the item does not exist.

## Functions

### tryGetDriveItemByPath()

> **tryGetDriveItemByPath**(`parentRef`, `itemPath`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`null` \| `DriveItem` & [`SiteRef`](Site-1.md#siteref) & `object` & `object`\>

Defined in: [src/tasks/tryGetDriveItemByPath.ts:20](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/tasks/tryGetDriveItemByPath.ts#L20)

Attempts to retrieve the metadata for an item in a drive or folder by file path.
Returns null if the item does not exist (NotFoundError).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `parentRef` | [`DriveRef`](Drive-1.md#driveref) \| [`DriveItemRef`](DriveItem-1.md#driveitemref) | Reference to the drive or folder containing the item. |
| `itemPath` | [`DriveItemPath`](DriveItem-1.md#driveitempath) | Path of the item within the drive. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`null` \| `DriveItem` & [`SiteRef`](Site-1.md#siteref) & `object` & `object`\>

The metadata of the specified drive item, or null if not found.

#### See

https://learn.microsoft.com/en-us/graph/api/driveitem-get
