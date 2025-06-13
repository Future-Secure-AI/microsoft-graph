[Microsoft Graph SDK](README.md) / createBinaryWorkbook

# createBinaryWorkbook

Create a new blank binary workbook (XLSB).

## Functions

### createBinaryWorkbook()

> **createBinaryWorkbook**(`parentRef`, `itemPath`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`DriveItem` & [`SiteRef`](Site-1.md#siteref) & `object` & `object` & `object`\>

Defined in: src/operations/workbook/createBinaryWorkbook.ts:28

Create a new blank binary workbook (XLSB).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `parentRef` | [`DriveRef`](Drive-1.md#driveref) \| [`DriveItemRef`](DriveItem-1.md#driveitemref) | Reference to the parent drive or folder where the workbook will be created. |
| `itemPath` | [`DriveItemPath`](DriveItem-1.md#driveitempath) | Path (including the filename) for the new workbook. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`DriveItem` & [`SiteRef`](Site-1.md#siteref) & `object` & `object` & `object`\>

Newly created workbook.

#### Throws

[InvalidArgumentError](InvalidArgumentError.md) if the item path does not end with `.xlsb`.

#### See

https://learn.microsoft.com/en-us/graph/api/driveitem-put-content
