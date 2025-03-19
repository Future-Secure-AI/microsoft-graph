import { debug, info, } from "./log.js";
import { executeSingle } from "./microsoftGraph/graphApi.js";
import updateWorkbookRange from "./microsoftGraph/operations/workbookRange/updateWorkbookRange.js";
import { defaultDriveRef } from "./microsoftGraph/services/configuration.js";
import { driveItemPath, workbookFileExtension } from "./microsoftGraph/services/driveItem.js";
import { generateTempFileName } from "./microsoftGraph/services/temporaryFiles.js";
import { defaultWorksheetId, workbookWorksheetRef } from "./microsoftGraph/services/workbookWorksheet.js";
import { workbookWorksheetRangeRef } from "./microsoftGraph/services/workbookWorksheetRange.js";
import { workbookRangeAddress } from "./microsoftGraph/services/workbookWorksheetRangeAddress.js";
import createWorkbookAndStartSessionAndGetRef from "./microsoftGraph/tasks/createWorkbookAndStartSessionAndGetRef.js";
import endSessionAndDeleteWorkbook from "./microsoftGraph/tasks/endSessionAndDeleteWorkbook.js";
import listItemsAndGetRefs from "./microsoftGraph/tasks/listItemsAndGetRefs.js";

export async function main(): Promise<void> {
	const testFolderPath = driveItemPath("test");
	const testFilePath = driveItemPath(testFolderPath, generateTempFileName(workbookFileExtension));

	info("Creating file...");
	const workbookRef = await createWorkbookAndStartSessionAndGetRef(defaultDriveRef, testFilePath);
	const worksheetRef = workbookWorksheetRef(workbookRef, defaultWorksheetId);

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
	const items = await listItemsAndGetRefs(defaultDriveRef, testFolderPath);
	for (const item of items) {
		debug(` - ${item.name}`);
	}

	info("Deleting file...");
	await endSessionAndDeleteWorkbook(workbookRef);

	info("Done.");
}

