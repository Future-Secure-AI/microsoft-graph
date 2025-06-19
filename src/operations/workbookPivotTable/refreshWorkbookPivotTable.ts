/**
 * Refresh a specific pivot table in a worksheet.
 * @module refreshWorkbookPivotTable
 * @category Operations
 */

import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookPivotTableRef } from "../../models/WorkbookPivotTable.ts";
import { operation } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Refresh a specific pivot table in a worksheet.
 * @param pivotTableRef Reference to the pivot table.
 * @returns void (no response body)
 * @see https://learn.microsoft.com/en-us/graph/api/workbookpivottable-refresh
 * @example
 * const tenantId = getEnvironmentVariable("AZURE_TENANT_ID") as AzureTenantId;
 * const clientId = getEnvironmentVariable("AZURE_CLIENT_ID") as AzureClientId;
 * const clientSecret = getEnvironmentVariable("AZURE_CLIENT_SECRET") as AzureClientSecret;
 * const siteId = getEnvironmentVariable("SHAREPOINT_SITE_ID") as SiteId;
 * const driveId = getEnvironmentVariable("SHAREPOINT_DRIVE_ID") as DriveId;
 * const driveItemPath = "/path/to/your/workbook.xlsx" as DriveItemPath;
 * const worksheetName = "Sheet1" as WorkbookWorksheetName;
 * const pivotTableId = "PivotTable1" as WorkbookPivotTableId;
 *
 * const contextRef = createClientSecretContext(tenantId, clientId, clientSecret);
 * const siteRef = createSiteRef(contextRef, siteId);
 * const driveRef = createDriveRef(siteRef, driveId);
 * const driveItemRef = await getDriveItemByPath(driveRef, driveItemPath);
 * const worksheetRef = await getWorkbookWorksheetByName(driveItemRef, worksheetName);
 * const pivotTableRef = createWorkbookPivotTableRef(worksheetRef, pivotTableId);
 * await refreshWorkbookPivotTable(pivotTableRef);
 */
export default function refreshWorkbookPivotTable(pivotTableRef: WorkbookPivotTableRef): GraphOperation<void> {
	return operation({
		context: pivotTableRef.context,
		method: "POST",
		path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/pivotTables/{pivot-table-id}/refresh", { ...pivotTableRef, pivotTableId: pivotTableRef.pivotTableId }),
		headers: {
			"workbook-session-id": pivotTableRef.sessionId,
		},
		body: null,
		responseTransform: () => undefined,
	});
}
