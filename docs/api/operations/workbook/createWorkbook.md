[Microsoft Graph SDK](../../README.md) / operations/workbook/createWorkbook

## Functions

### createWorkbook()

> **createWorkbook**(`parentRef`, `itemPath`): [`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`DriveItem` & [`SiteRef`](../../models/SiteRef.md#siteref) & `object` & `object` & `object`\>

Defined in: [src/operations/workbook/createWorkbook.ts:22](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbook/createWorkbook.ts#L22)

Create a new blank workbook.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `parentRef` | [`DriveRef`](../../models/DriveRef.md#driveref) \| [`DriveItemRef`](../../models/DriveItemRef.md#driveitemref) | A reference to the parent drive or folder where the workbook will be created. |
| `itemPath` | [`DriveItemPath`](../../models/DriveItemPath.md#driveitempath) | The path (including the filename) for the new workbook. Must end with `.xlsx`. |

#### Returns

[`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`DriveItem` & [`SiteRef`](../../models/SiteRef.md#siteref) & `object` & `object` & `object`\>

The newly created workbook, including its metadata and reference information.

#### Throws

InvalidArgumentError if the item path does not end with `.xlsx`.

#### See

https://learn.microsoft.com/en-us/graph/api/driveitem-put-content
