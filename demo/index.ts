import type { AzureClientId, AzureClientSecret, AzureTenantId } from "../src/models/AzureApplicationCredentials.ts";
import type { DriveId } from "../src/models/Drive.ts";
import type { DriveItemPath } from "../src/models/DriveItem.ts";
import type { SiteId } from "../src/models/Site.ts";
import type { WorkbookPivotTableId } from "../src/models/WorkbookPivotTable.ts";
import type { WorkbookWorksheetName } from "../src/models/WorkbookWorksheet.ts";
import getDriveItemByPath from "../src/operations/driveItem/getDriveItemByPath.ts";
import refreshWorkbookPivotTable from "../src/operations/workbookPivotTable/refreshWorkbookPivotTable.ts";
import getWorkbookWorksheetByName from "../src/operations/workbookWorksheet/getWorkbookWorksheetByName.ts";
import { createClientSecretContext } from "../src/services/context.ts";
import { createDriveRef } from "../src/services/drive.ts";
import { workbookFileExtension } from "../src/services/driveItem.ts";
import { getEnvironmentVariable } from "../src/services/environmentVariable.ts";
import { createSiteRef } from "../src/services/site.ts";
import { generateTempFileName } from "../src/services/temporaryFiles.ts";
import { createWorkbookPivotTableRef } from "../src/services/workbookPivotTable.ts";
import { createWorkbookRangeRef } from "../src/services/workbookRange.ts";
import { createDefaultWorkbookWorksheetRef } from "../src/services/workbookWorksheet.ts";
import createWorkbookAndStartSession from "../src/tasks/createWorkbookAndStartSession.ts";
import readWorkbookRows from "../src/tasks/readWorkbookRows.ts";
import safeDeleteWorkbook from "../src/tasks/safeDeleteWorkbook.ts";
import writeWorkbookRows from "../src/tasks/writeWorkbookRows.ts";
console.info("Loading envs...");
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

console.info("Creating workbook...");
const workbook = await createWorkbookAndStartSession(driveRef, generateTempFileName(workbookFileExtension));
try {
	console.info("Getting worksheet...");
	const worksheetRef = createDefaultWorkbookWorksheetRef(workbook); // OR `await getWorkbookWorksheetByName(workbook, "Sheet1");` to get one by name

	console.info("Writing values to range...");
	const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:B3");
	await writeWorkbookRows(rangeRef, [
		[{ value: 1 }, { value: 2 }],
		[{ value: 3 }, { value: 4 }],
		[{ value: 5 }, { value: 6 }],
	]);

	console.info("Reading range...");
	for await (const row of readWorkbookRows(rangeRef)) {
		console.debug(` ${row.map((cell) => cell.value).join(", ")}`);
	}
} finally {
	console.info("Cleanup...");
	await safeDeleteWorkbook(workbook);
}

console.info("Done.");
