import type { ClientId } from "../src/models/ClientId.ts";
import type { ClientSecret } from "../src/models/ClientSecret.ts";
import type { DriveId } from "../src/models/DriveId.ts";
import type { HttpProxy } from "../src/models/HttpProxy.ts";
import type { SiteId } from "../src/models/SiteId.ts";
import type { TenantId } from "../src/models/TenantId.ts";
import { register } from "../src/services/context.ts";
import { createDriveRef } from "../src/services/drive.ts";
import { workbookFileExtension } from "../src/services/driveItem.ts";
import { getEnvironmentVariable } from "../src/services/environmentVariable.ts";
import { createSiteRef } from "../src/services/site.ts";
import { generateTempFileName } from "../src/services/temporaryFiles.ts";
import { createWorkbookRangeRef } from "../src/services/workbookRange.ts";
import createWorkbookAndStartSession from "../src/tasks/createWorkbookAndStartSession.ts";
import getWorkbookWorksheetByName from "../src/tasks/getWorkbookWorksheetByName.ts";
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
const httpProxy = (getEnvironmentVariable("HTTP_PROXY", "") || undefined) as HttpProxy | undefined; // Not normally required

info("Get drive...");
const contextRef = register(tenantId, clientId, clientSecret, httpProxy);
const siteRef = createSiteRef(contextRef, siteId);
const driveRef = createDriveRef(siteRef, driveId);

info("Creating workbook...");
const workbook = await createWorkbookAndStartSession(driveRef, generateTempFileName(workbookFileExtension));

info("Setting range...");
const worksheet = await getWorkbookWorksheetByName(workbook, "Sheet1");
const rangeRef = createWorkbookRangeRef(worksheet, "A1:B3");
await setWorkbookRangeValues(rangeRef, [
	[1, 2],
	[3, 4],
	[5, 6],
]);

info("Iterating range...");
for await (const rowValues of iterateWorkbookRangeValues(rangeRef)) {
	debug(` ${rowValues}`);
}

info("Cleanup...");
await safeDeleteWorkbook(workbook);

info("Done.");
