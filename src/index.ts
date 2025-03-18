import { debug, info, } from "./log.js";
import closeSessionAndDeleteWorkbook from "./microsoftGraph/tasks/closeSessionAndDeleteWorkbook.js";
import createWorkbookAndOpenSessionAndGetRef from "./microsoftGraph/tasks/createWorkbookAndOpenSessionAndGetRef.js";
import getDefaultDriveRef from "./microsoftGraph/tasks/getDefaultDriveRef.js";
import listItemsAndGetRefs from "./microsoftGraph/tasks/listItemsAndGetRefs.js";
import { drivePath } from "./microsoftGraph/services/drivePath.js";
import { workbookFileExtension, } from "./microsoftGraph/services/workbookFile.js";

export async function main(): Promise<void> {
	const testFolderPath = drivePath("test");
	const testFilePath = drivePath(testFolderPath, `${crypto.randomUUID()}${workbookFileExtension}`);
	const driveRef = getDefaultDriveRef();

	info("Creating file...");
	const workbookRef = await createWorkbookAndOpenSessionAndGetRef(driveRef, testFilePath);

	info("Listing files...");
	const items = await listItemsAndGetRefs(driveRef, testFolderPath);
	for (const item of items) {
		debug(` - ${item.name}`);
	}

	info("Deleting file...");
	await closeSessionAndDeleteWorkbook(workbookRef);

	info("Done.");
}
