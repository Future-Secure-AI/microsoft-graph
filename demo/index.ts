import listDrives from "../src/operations/drive/listDrives.ts";
import updateWorkbookRange from "../src/operations/workbookRange/updateWorkbookRange.ts";
import { defaultDriveRef, } from "../src/services/configuration.ts";
import { driveItemPath, workbookFileExtension } from "../src/services/driveItem.ts";
import { generateTempFileName } from "../src/services/temporaryFiles.ts";
import { workbookWorksheetRangeRef } from "../src/services/workbookWorksheetRange.ts";
import { workbookRangeAddress } from "../src/services/workbookWorksheetRangeAddress.ts";
import createWorkbookAndStartSession from "../src/tasks/createWorkbookAndStartSession.ts";
import endSessionAndDeleteWorkbook from "../src/tasks/endSessionAndDeleteWorkbook.ts";
import getWorkbookWorksheetByName from "../src/tasks/getWorkbookWorksheetRefByName.ts";
import listDriveItemRefs from "../src/tasks/listDriveItemRefs.ts";
import { debug, info, } from "./log.ts";

info("Listing drives...");
const driveList = await listDrives(defaultDriveRef)
for (const drive of driveList.value) {
	debug(` - ${drive.name}`);
}

const folderPath = driveItemPath("test");
const workbookPath = driveItemPath(folderPath, generateTempFileName(workbookFileExtension));

info("Creating file...");
const workbookRef = await createWorkbookAndStartSession(defaultDriveRef, workbookPath);
const worksheetRef = await getWorkbookWorksheetByName(workbookRef, "Sheet1"); // Should just use `workbookWorksheetRef(workbookRef, defaultWorkbookWorksheetId)` since it's faster and less brittle, but this is demonstrating the named approach.

info("Updating range...");
const rangeAddress = workbookRangeAddress("A1:B2");
const rangeRef = workbookWorksheetRangeRef(worksheetRef, rangeAddress);
await updateWorkbookRange(rangeRef, {
	values: [
		[1, 2],
		[3, 4]
	]
});

info("Listing files...");
const items = await listDriveItemRefs(defaultDriveRef, folderPath);
for (const item of items) {
	debug(` - ${item.name}`);
}

info("Deleting file...");
await endSessionAndDeleteWorkbook(workbookRef);

info("Done.");
