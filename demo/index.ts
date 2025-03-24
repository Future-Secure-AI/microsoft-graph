import createFolder from "../src/operations/drive/createFolder.ts";
import listDriveItems from "../src/operations/driveItem/listDriveItems.ts";
import updateWorkbookRange from "../src/operations/workbookRange/updateWorkbookRange.ts";
import { getDefaultDriveRef } from "../src/services/drive.ts";
import { driveItemPath, workbookFileExtension } from "../src/services/driveItem.ts";
import { generateTempFileName } from "../src/services/temporaryFiles.ts";
import { workbookRangeRef } from "../src/services/workbookRange.ts";
import createWorkbookAndStartSession from "../src/tasks/createWorkbookAndStartSession.ts";
import endSessionAndDeleteWorkbook from "../src/tasks/endSessionAndDeleteWorkbook.ts";
import getWorkbookWorksheetByName from "../src/tasks/getWorkbookWorksheetRefByName.ts";
import { debug, info, } from "./log.ts";

info("Creating folder...");
const driveRef = getDefaultDriveRef();
const folderPath = generateTempFileName();
await createFolder(driveRef, folderPath);

info("Creating workbook...");
const workbookPath = driveItemPath(folderPath, generateTempFileName(workbookFileExtension));
const workbook = await createWorkbookAndStartSession(driveRef, workbookPath);

info("Updating range...");
const worksheet = await getWorkbookWorksheetByName(workbook, "Sheet1");
const rangeRef = workbookRangeRef(worksheet, "A1:B2");
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
await endSessionAndDeleteWorkbook(workbook);

info("Done.");
