import { debug, info, } from "./log.ts";
import listDrives from "./operations/drive/listDrives.ts";
import updateWorkbookRange from "./operations/workbookRange/updateWorkbookRange.ts";
import { defaultDriveRef, } from "./services/configuration.ts";
import { driveItemPath, workbookFileExtension } from "./services/driveItem.ts";
import { generateTempFileName } from "./services/temporaryFiles.ts";
import { workbookWorksheetRangeRef } from "./services/workbookWorksheetRange.ts";
import { workbookRangeAddress } from "./services/workbookWorksheetRangeAddress.ts";
import createWorkbookAndStartSession from "./tasks/createWorkbookAndStartSession.ts";
import endSessionAndDeleteWorkbook from "./tasks/endSessionAndDeleteWorkbook.ts";
import getWorkbookWorksheetByName from "./tasks/getWorkbookWorksheetRefByName.ts";
import listDriveItemRefs from "./tasks/listDriveItemRefs.ts";

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
