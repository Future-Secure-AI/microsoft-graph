import createFolder from "../src/operations/drive/createFolder.ts";
import deleteDriveItem from "../src/operations/driveItem/deleteDriveItem.ts";
import listDriveItems from "../src/operations/driveItem/listDriveItems.ts";
import updateWorkbookRange from "../src/operations/workbookRange/updateWorkbookRange.ts";
import closeWorkbookSession from "../src/operations/workbookSession/closeWorkbookSession.ts";
import { getDefaultDriveRef } from "../src/services/drive.ts";
import { workbookFileExtension } from "../src/services/driveItem.ts";
import { generateTempFileName } from "../src/services/temporaryFiles.ts";
import { workbookRangeRef } from "../src/services/workbookRange.ts";
import createWorkbookAndStartSession from "../src/tasks/createWorkbookAndStartSession.ts";
import getWorkbookWorksheetByName from "../src/tasks/getWorkbookWorksheetRefByName.ts";
import { debug, info, } from "./log.ts";

login(tentnatId, clientId, clientSecret);

const cred = {tenantId, clientId};

info("Creating folder...");
const driveRef = getDefaultDriveRef(cred);
const folder = await createFolder(driveRef, generateTempFileName());

info("Creating workbook...");;
const workbook = await createWorkbookAndStartSession(folder, generateTempFileName(workbookFileExtension));

info("Updating range...");
const worksheet = await getWorkbookWorksheetByName(workbook, "Sheet1");
const range = await updateWorkbookRange(workbookRangeRef(worksheet, "A1:B2"), {
	values: [
		[1, 2],
		[3, 4]
	]
});
await updateWorkbookRange(range, { // Could be merged with the above, but demo'ing ref use
	format: {
		font: {
			bold: true
		}
	}
});

info("Listing files...");
for (const item of await listDriveItems(folder)) {
	debug(` - ${item.name}`);
}

info("Cleanup...");
await closeWorkbookSession(workbook);
await deleteDriveItem(folder);

info("Done.");
