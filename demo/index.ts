import listDrives from "../src/operations/drive/listDrives.ts";
import listDriveItems from "../src/operations/driveItem/listDriveItems.ts";
import updateWorkbookRange from "../src/operations/workbookRange/updateWorkbookRange.ts";
import { getDefaultDriveRef } from "../src/services/drive.ts";
import { driveItemPath, workbookFileExtension } from "../src/services/driveItem.ts";
import { generateTempFileName } from "../src/services/temporaryFiles.ts";
import { workbookWorksheetRangeRef } from "../src/services/workbookWorksheetRange.ts";
import createWorkbookAndStartSession from "../src/tasks/createWorkbookAndStartSession.ts";
import endSessionAndDeleteWorkbook from "../src/tasks/endSessionAndDeleteWorkbook.ts";
import getWorkbookWorksheetByName from "../src/tasks/getWorkbookWorksheetRefByName.ts";
import { debug, info, } from "./log.ts";

const driveRef = getDefaultDriveRef();

info("Listing drives...");
for (const drive of await listDrives(driveRef)) {
	debug(` - ${drive.name}`);
}

const folderPath = driveItemPath("test");
const workbookPath = driveItemPath(folderPath, generateTempFileName(workbookFileExtension));

info("Creating file...");
const workbookRef = await createWorkbookAndStartSession(driveRef, workbookPath);
const worksheetRef = await getWorkbookWorksheetByName(workbookRef, "Sheet1"); // Should just use `workbookWorksheetRef(workbookRef, defaultWorkbookWorksheetId)` since it's faster and less brittle, but this is demonstrating the named approach.

info("Updating range...");
const rangeRef = workbookWorksheetRangeRef(worksheetRef, "A1:B2");
await updateWorkbookRange(rangeRef, {
	values: [
		[1, 2],
		[3, 4]
	]
});

info("Listing files...");
for (const item of await listDriveItems(driveRef, folderPath)) {
	debug(` - ${item.name}`);
}

info("Deleting file...");
await endSessionAndDeleteWorkbook(workbookRef);

info("Done.");
