/**
 * Refresh all pivot tables in a worksheet.
 * @module refreshAllWorkbookPivotTables
 * @category Operations
 */

import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookWorksheetRef } from "../../models/WorkbookWorksheet.ts";
import { operation } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Refresh all pivot tables in a worksheet.
 * @param worksheetRef Reference to the worksheet.
 * @returns void (no response body)
 * @see https://learn.microsoft.com/en-us/graph/api/workbookpivottable-refreshall
 * @example
 * const tenantId = getEnvironmentVariable("AZURE_TENANT_ID") as AzureTenantId;
 * const clientId = getEnvironmentVariable("AZURE_CLIENT_ID") as AzureClientId;
 * const clientSecret = getEnvironmentVariable("AZURE_CLIENT_SECRET") as AzureClientSecret;
 * const siteId = getEnvironmentVariable("SHAREPOINT_SITE_ID") as SiteId;
 * const driveId = getEnvironmentVariable("SHAREPOINT_DRIVE_ID") as DriveId;
 * const driveItemPath = "/path/to/your/workbook.xlsx" as DriveItemPath;
 * const worksheetName = "Sheet1" as WorkbookWorksheetName;
 *
 * const contextRef = createClientSecretContext(tenantId, clientId, clientSecret);
 * const siteRef = createSiteRef(contextRef, siteId);
 * const driveRef = createDriveRef(siteRef, driveId);
 * const driveItemRef = await getDriveItemByPath(driveRef, driveItemPath);
 * const worksheetRef = await getWorkbookWorksheetByName(driveItemRef, worksheetName);
 * await refreshAllWorkbookPivotTables(worksheetRef);
 */
export default function refreshAllWorkbookPivotTables(worksheetRef: WorkbookWorksheetRef): GraphOperation<void> {
	return operation({
		context: worksheetRef.context,
		method: "POST",
		path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/pivotTables/refreshAll", worksheetRef),
		headers: {
			"workbook-session-id": worksheetRef.sessionId,
		},
		body: null,
		responseTransform: () => undefined,
	});
}
