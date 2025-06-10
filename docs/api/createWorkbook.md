[Microsoft Graph SDK](README.md) / createWorkbook

# createWorkbook

Create a new blank workbook.

## Functions

### createWorkbook()

> **createWorkbook**(`parentRef`, `itemPath`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`DriveItem` & [`SiteRef`](Site-1.md#siteref) & `object` & `object` & `object`\>

Defined in: [src/operations/workbook/createWorkbook.ts:25](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbook/createWorkbook.ts#L25)

Create a new blank workbook.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `parentRef` | [`DriveRef`](Drive-1.md#driveref) \| [`DriveItemRef`](DriveItem-1.md#driveitemref) | Reference to the parent drive or folder where the workbook will be created. |
| `itemPath` | [`DriveItemPath`](DriveItem-1.md#driveitempath) | Path (including the filename) for the new workbook. Must end with `.xlsx`. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`DriveItem` & [`SiteRef`](Site-1.md#siteref) & `object` & `object` & `object`\>

Newly created workbook.

#### Throws

[InvalidArgumentError](InvalidArgumentError.md) if the item path does not end with `.xlsx`.

#### See

https://learn.microsoft.com/en-us/graph/api/driveitem-put-content
