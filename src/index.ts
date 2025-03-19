import { debug, info, } from "./log.js";
import listDrives from "./microsoftGraph/operations/drive/listDrives.js";
import updateWorkbookRange from "./microsoftGraph/operations/workbookRange/updateWorkbookRange.js";
import { defaultDriveRef, } from "./microsoftGraph/services/configuration.js";
import { driveItemPath, workbookFileExtension } from "./microsoftGraph/services/driveItem.js";
import { generateTempFileName } from "./microsoftGraph/services/temporaryFiles.js";
import { workbookWorksheetRangeRef } from "./microsoftGraph/services/workbookWorksheetRange.js";
import { workbookRangeAddress } from "./microsoftGraph/services/workbookWorksheetRangeAddress.js";
import createWorkbookAndStartSession from "./microsoftGraph/tasks/createWorkbookAndStartSession.js";
import endSessionAndDeleteWorkbook from "./microsoftGraph/tasks/endSessionAndDeleteWorkbook.js";
import { getWorkbookWorksheetRefByName } from "./microsoftGraph/tasks/getWorkbookWorksheetRefByName.js";
import listDriveItemRefs from "./microsoftGraph/tasks/listDriveItemRefs.js";

export async function main(): Promise<void> {
	info("Listing drives...");
	const driveList = await listDrives(defaultDriveRef)
	for (const drive of driveList.value) {
		debug(` - ${drive.name}`);
	}

	const folderPath = driveItemPath("test");
	const workbookPath = driveItemPath(folderPath, generateTempFileName(workbookFileExtension));

	info("Creating file...");
	const workbookRef = await createWorkbookAndStartSession(defaultDriveRef, workbookPath);
	const worksheetRef = await getWorkbookWorksheetRefByName(workbookRef, "Sheet1"); // Should just use `workbookWorksheetRef(workbookRef, defaultWorkbookWorksheetId)` since it's much faster and less brittle, but this is demonstrating the named approach.

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
}
