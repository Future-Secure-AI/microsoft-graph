import { debug, info, } from "./log.js";
import { defaultDriveRef } from "./microsoftGraph/services/configuration.js";
import { driveItemPath, workbookFileExtension } from "./microsoftGraph/services/driveItem.js";
import { generateTempFileName } from "./microsoftGraph/services/temporaryFiles.js";
import createWorkbookAndStartSessionAndGetRef from "./microsoftGraph/tasks/createWorkbookAndStartSessionAndGetRef.js";
import endSessionAndDeleteWorkbook from "./microsoftGraph/tasks/endSessionAndDeleteWorkbook.js";
import listItemsAndGetRefs from "./microsoftGraph/tasks/listItemsAndGetRefs.js";

export async function main(): Promise<void> {
	const testFolderPath = driveItemPath("test");
	const testFilePath = driveItemPath(testFolderPath, generateTempFileName(workbookFileExtension));

	info("Creating file...");
	const workbookRef = await createWorkbookAndStartSessionAndGetRef(defaultDriveRef, testFilePath);

	info("Listing files...");
	const items = await listItemsAndGetRefs(defaultDriveRef, testFolderPath);
	for (const item of items) {
		debug(` - ${item.name}`);
	}

	info("Deleting file...");
	await endSessionAndDeleteWorkbook(workbookRef);

	info("Done.");
}
