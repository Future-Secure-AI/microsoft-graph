[Microsoft Graph SDK](README.md) / deleteWorkbook

# deleteWorkbook

Delete a workbook.

## Functions

### deleteWorkbook()

> **deleteWorkbook**(`workbookRef`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/workbook/deleteWorkbook.ts:17](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbook/deleteWorkbook.ts#L17)

Delete a workbook.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `workbookRef` | [`WorkbookRef`](Workbook.md#workbookref) | Reference to the workbook to be deleted. * |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`void`\>

#### Remarks

This is an alias for `deleteDriveItem`, as workbooks are treated as drive items in Microsoft Graph.

#### See

https://learn.microsoft.com/en-us/graph/api/driveitem-delete
