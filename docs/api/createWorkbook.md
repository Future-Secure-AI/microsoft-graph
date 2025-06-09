[Microsoft Graph SDK](README.md) / createWorkbook

Create a new blank workbook.

## Functions

### createWorkbook()

> **createWorkbook**(`parentRef`, `itemPath`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`DriveItem` & [`SiteRef`](SiteRef.md#siteref) & `object` & `object` & `object`\>

Defined in: [src/operations/workbook/createWorkbook.ts:27](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbook/createWorkbook.ts#L27)

Create a new blank workbook.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `parentRef` | [`DriveRef`](DriveRef.md#driveref) \| [`DriveItemRef`](DriveItemRef.md#driveitemref) | Reference to the parent drive or folder where the workbook will be created. |
| `itemPath` | [`DriveItemPath`](DriveItemPath.md#driveitempath) | Path (including the filename) for the new workbook. Must end with `.xlsx`. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`DriveItem` & [`SiteRef`](SiteRef.md#siteref) & `object` & `object` & `object`\>

Newly created workbook.

#### Throws

[InvalidArgumentError](InvalidArgumentError.md) if the item path does not end with `.xlsx`.

#### See

https://learn.microsoft.com/en-us/graph/api/driveitem-put-content
