[Microsoft Graph SDK](README.md) / refreshWorkbookPivotTable

# refreshWorkbookPivotTable

Refresh a specific pivot table in a worksheet.

## Functions

### refreshWorkbookPivotTable()

> **refreshWorkbookPivotTable**(`pivotTableRef`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/workbookPivotTable/refreshWorkbookPivotTable.ts:35](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/workbookPivotTable/refreshWorkbookPivotTable.ts#L35)

Refresh a specific pivot table in a worksheet.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `pivotTableRef` | [`WorkbookPivotTableRef`](WorkbookPivotTable-1.md#workbookpivottableref) | Reference to the pivot table. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`void`\>

void (no response body)

#### See

https://learn.microsoft.com/en-us/graph/api/workbookpivottable-refresh

#### Example

```ts
const tenantId = getEnvironmentVariable("AZURE_TENANT_ID") as AzureTenantId;
const clientId = getEnvironmentVariable("AZURE_CLIENT_ID") as AzureClientId;
const clientSecret = getEnvironmentVariable("AZURE_CLIENT_SECRET") as AzureClientSecret;
const siteId = getEnvironmentVariable("SHAREPOINT_SITE_ID") as SiteId;
const driveId = getEnvironmentVariable("SHAREPOINT_DRIVE_ID") as DriveId;
const driveItemPath = "/path/to/your/workbook.xlsx" as DriveItemPath;
const worksheetName = "Sheet1" as WorkbookWorksheetName;
const pivotTableId = "PivotTable1" as WorkbookPivotTableId;

const contextRef = createClientSecretContext(tenantId, clientId, clientSecret);
const siteRef = createSiteRef(contextRef, siteId);
const driveRef = createDriveRef(siteRef, driveId);
const driveItemRef = await getDriveItemByPath(driveRef, driveItemPath);
const worksheetRef = await getWorkbookWorksheetByName(driveItemRef, worksheetName);
const pivotTableRef = createWorkbookPivotTableRef(worksheetRef, pivotTableId);
await refreshWorkbookPivotTable(pivotTableRef);
```
