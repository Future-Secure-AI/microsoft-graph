import type { ClientId } from "../src/models/ClientId.ts";
import type { ClientSecret } from "../src/models/ClientSecret.ts";
import type { DriveId } from "../src/models/DriveId.ts";
import type { SiteId } from "../src/models/SiteId.ts";
import type { TenantId } from "../src/models/TenantId.ts";
import { register } from "../src/services/context.ts";
import { createDriveRef } from "../src/services/drive.ts";
import { workbookFileExtension } from "../src/services/driveItem.ts";
import { getEnvironmentVariable } from "../src/services/environmentVariable.ts";
import { createSiteRef } from "../src/services/site.ts";
import { generateTempFileName } from "../src/services/temporaryFiles.ts";
import { createWorkbookRangeRef } from "../src/services/workbookRange.ts";
import { createDefaultWorkbookWorksheetRef } from "../src/services/workbookWorksheet.ts";
import createWorkbookAndStartSession from "../src/tasks/createWorkbookAndStartSession.ts";
import iterateWorkbookRangeValues from "../src/tasks/iterateWorkbookRangeValues.ts";
import safeDeleteWorkbook from "../src/tasks/safeDeleteWorkbook.ts";
import setWorkbookRangeValues from "../src/tasks/setWorkbookRangeValues.ts";
import { debug, info } from "./log.ts";

info("Loading envs...");
const tenantId = getEnvironmentVariable("AZURE_TENANT_ID") as TenantId;
const clientId = getEnvironmentVariable("AZURE_CLIENT_ID") as ClientId;
const clientSecret = getEnvironmentVariable("AZURE_CLIENT_SECRET") as ClientSecret;
const siteId = getEnvironmentVariable("SHAREPOINT_DEFAULT_SITE_ID") as SiteId;
const driveId = getEnvironmentVariable("SHAREPOINT_DEFAULT_DRIVE_ID") as DriveId;

info("Get drive...");
const contextRef = register(tenantId, clientId, clientSecret);
const siteRef = createSiteRef(contextRef, siteId);
const driveRef = createDriveRef(siteRef, driveId);

info("Creating workbook...");
const workbook = await createWorkbookAndStartSession(driveRef, generateTempFileName(workbookFileExtension));

info("Getting worksheet...");
const worksheetRef = createDefaultWorkbookWorksheetRef(workbook); // OR `await getWorkbookWorksheetByName(workbook, "Sheet1");` to get one by name

info("Writing values to arange...");
const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:B3");
await setWorkbookRangeValues(rangeRef, [
	[1, 2],
	[3, 4],
	[5, 6],
]);

info("Reading range...");
for await (const rowValues of iterateWorkbookRangeValues(rangeRef)) {
	// This automatically uses multiple requests if the range is too big for a single request
	debug(` ${rowValues}`);
}

info("Cleanup...");
await safeDeleteWorkbook(workbook);

info("Done.");
