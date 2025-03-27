import { ClientId } from "../src/models/ClientId.ts";
import { ClientSecret } from "../src/models/ClientSecret.ts";
import { DriveId } from "../src/models/DriveId.ts";
import { HttpProxy } from "../src/models/HttpProxy.ts";
import { SiteId } from "../src/models/SiteId.ts";
import { TenantId } from "../src/models/TenantId.ts";
import createFolder from "../src/operations/drive/createFolder.ts";
import listDriveItems from "../src/operations/driveItem/listDriveItems.ts";
import updateWorkbookRange from "../src/operations/workbookRange/updateWorkbookRange.ts";
import closeWorkbookSession from "../src/operations/workbookSession/closeWorkbookSession.ts";
import { register } from "../src/services/context.ts";
import { createDriveRef } from "../src/services/drive.ts";
import { workbookFileExtension } from "../src/services/driveItem.ts";
import { getEnvironmentVariable } from "../src/services/environmentVariable.ts";
import { createSiteRef } from "../src/services/site.ts";
import { generateTempFileName } from "../src/services/temporaryFiles.ts";
import { createWorkbookRangeRef } from "../src/services/workbookRange.ts";
import createWorkbookAndStartSession from "../src/tasks/createWorkbookAndStartSession.ts";
import deleteDriveItemWithRetry from "../src/tasks/deleteDriveItemWithRetry.ts";
import getWorkbookWorksheetByName from "../src/tasks/getWorkbookWorksheetRefByName.ts";
import { debug, info, } from "./log.ts";

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

info("Creating folder...");
const folder = await createFolder(driveRef, generateTempFileName());

info("Creating workbook...");
const workbook = await createWorkbookAndStartSession(folder, generateTempFileName(workbookFileExtension));

info("Updating range...");
const worksheet = await getWorkbookWorksheetByName(workbook, "Sheet1");
const rangeRef = createWorkbookRangeRef(worksheet, "A1:B2");
await updateWorkbookRange(rangeRef, {
	values: [
		[1, 2],
		[3, 4]
	]
});

info("Listing files...");
for (const item of await listDriveItems(folder)) {
	debug(` - ${item.name}`);
}

info("Cleanup...");
await closeWorkbookSession(workbook);
await deleteDriveItemWithRetry(folder); // May take a moment to unlock the file

info("Done.");
