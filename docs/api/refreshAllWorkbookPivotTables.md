[Microsoft Graph SDK](README.md) / refreshAllWorkbookPivotTables

# refreshAllWorkbookPivotTables

Refresh all pivot tables in a worksheet.

## Functions

### refreshAllWorkbookPivotTables()

> **refreshAllWorkbookPivotTables**(`worksheetRef`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/workbookPivotTable/refreshAllWorkbookPivotTables.ts:33](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookPivotTable/refreshAllWorkbookPivotTables.ts#L33)

Refresh all pivot tables in a worksheet.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `worksheetRef` | [`WorkbookWorksheetRef`](WorkbookWorksheet-1.md#workbookworksheetref) | Reference to the worksheet. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`void`\>

void (no response body)

#### See

https://learn.microsoft.com/en-us/graph/api/workbookpivottable-refreshall

#### Example

```ts
const tenantId = getEnvironmentVariable("AZURE_TENANT_ID") as AzureTenantId;
const clientId = getEnvironmentVariable("AZURE_CLIENT_ID") as AzureClientId;
const clientSecret = getEnvironmentVariable("AZURE_CLIENT_SECRET") as AzureClientSecret;
const siteId = getEnvironmentVariable("SHAREPOINT_SITE_ID") as SiteId;
const driveId = getEnvironmentVariable("SHAREPOINT_DRIVE_ID") as DriveId;
const driveItemPath = "/path/to/your/workbook.xlsx" as DriveItemPath;
const worksheetName = "Sheet1" as WorkbookWorksheetName;

const contextRef = createClientSecretContext(tenantId, clientId, clientSecret);
const siteRef = createSiteRef(contextRef, siteId);
const driveRef = createDriveRef(siteRef, driveId);
const driveItemRef = await getDriveItemByPath(driveRef, driveItemPath);
const worksheetRef = await getWorkbookWorksheetByName(driveItemRef, worksheetName);
await refreshAllWorkbookPivotTables(worksheetRef);
```
