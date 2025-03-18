import { debug, info, } from "./log.js";
import closeSessionAndDeleteWorkbook from "./microsoftGraph/helpers/closeSessionAndDeleteWorkbook.js";
import createWorkbookAndOpenSessionAndGetRef from "./microsoftGraph/helpers/createWorkbookAndOpenSessionAndGetRef.js";
import getDefaultDriveRef from "./microsoftGraph/helpers/getDefaultDriveRef.js";
import listItemsAndGetRefs from "./microsoftGraph/helpers/listItemsAndGetRefs.js";
import type { DriveItemPath } from "./microsoftGraph/models/DriveItemPath.js";
import { workbookFileExtension, } from "./microsoftGraph/services/workbookFile.js";

export async function run(): Promise<void> {
	const testFolderPath = "/test" as DriveItemPath;
	const testFilePath = `/${testFolderPath}/${crypto.randomUUID()}${workbookFileExtension}` as DriveItemPath;
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
