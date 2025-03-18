import { debug, info, } from "./log.js";
import { defaultDriveRef } from "./microsoftGraph/services/configuration.js";
import { drivePath } from "./microsoftGraph/services/drivePath.js";
import { workbookFileExtension, } from "./microsoftGraph/services/workbookFile.js";
import closeSessionAndDeleteWorkbook from "./microsoftGraph/tasks/closeSessionAndDeleteWorkbook.js";
import createWorkbookAndOpenSessionAndGetRef from "./microsoftGraph/tasks/createWorkbookAndOpenSessionAndGetRef.js";
import listItemsAndGetRefs from "./microsoftGraph/tasks/listItemsAndGetRefs.js";

export async function main(): Promise<void> {
	const testFolderPath = drivePath("test");
	const testFilePath = drivePath(testFolderPath, `${crypto.randomUUID()}${workbookFileExtension}`);

	info("Creating file...");
	const workbookRef = await createWorkbookAndOpenSessionAndGetRef(defaultDriveRef, testFilePath);

	info("Listing files...");
	const items = await listItemsAndGetRefs(defaultDriveRef, testFolderPath);
	for (const item of items) {
		debug(` - ${item.name}`);
	}

	info("Deleting file...");
	await closeSessionAndDeleteWorkbook(workbookRef);

	info("Done.");
}
