import { debug, info, } from "./log.js";
import { executeSingle } from "./microsoftGraph/graphApi.js";
import updateWorkbookRange from "./microsoftGraph/operations/workbookRange/updateWorkbookRange.js";
import { defaultDriveRef } from "./microsoftGraph/services/configuration.js";
import { driveItemPath, workbookFileExtension } from "./microsoftGraph/services/driveItem.js";
import { generateTempFileName } from "./microsoftGraph/services/temporaryFiles.js";
import { workbookWorksheetRangeRef } from "./microsoftGraph/services/workbookWorksheetRange.js";
import { workbookRangeAddress } from "./microsoftGraph/services/workbookWorksheetRangeAddress.js";
import createWorkbookAndStartSession from "./microsoftGraph/tasks/createWorkbookAndStartSession.js";
import endSessionAndDeleteWorkbook from "./microsoftGraph/tasks/endSessionAndDeleteWorkbook.js";
import { getWorkbookWorksheetByName } from "./microsoftGraph/tasks/getWorkbookWorksheetByName.js";
import listDriveItems from "./microsoftGraph/tasks/listDriveItems.js";

export async function main(): Promise<void> {
	const folderPath = driveItemPath("test");
	const workbookPath = driveItemPath(folderPath, generateTempFileName(workbookFileExtension));

	info("Creating file...");
	const workbookRef = await createWorkbookAndStartSession(defaultDriveRef, workbookPath);
	const worksheetRef = await getWorkbookWorksheetByName(workbookRef, "Sheet1"); // Should just use `workbookWorksheetRef(workbookRef, defaultWorkbookWorksheetId)` since it's much faster and less brittle, but this is demonstrating the named approach.

	info("Updating range...");
	const rangeAddress = workbookRangeAddress("A1:B2");
	const rangeRef = workbookWorksheetRangeRef(worksheetRef, rangeAddress);
	await executeSingle(updateWorkbookRange(rangeRef, {
		values: [
			[1, 2],
			[3, 4]
		]
	}));

	info("Listing files...");
	const items = await listDriveItems(defaultDriveRef, folderPath);
	for (const item of items) {
		debug(` - ${item.name}`);
	}

	info("Deleting file...");
	await endSessionAndDeleteWorkbook(workbookRef);

	info("Done.");
}

