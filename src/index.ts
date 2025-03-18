
import { info } from "./log.js";
import { execute } from "./microsoftGraph/graphApi.js";
import { openDefaultDrive as getDefaultDriveRef } from "./microsoftGraph/helpers/openDrive.js";
import { closeSessionAndDeleteWorkbook, createWorkbookAndOpenSession, workbookFileExtension, } from "./microsoftGraph/helpers/openWorkbook.js";
import type { DriveItemPath } from "./microsoftGraph/models/DriveItemPath.js";
import listDriveItems from "./microsoftGraph/operations/driveItem/listDriveItems.js";

export async function run(): Promise<void> {
	const testPath = "/test" as DriveItemPath;
	const testFile = `/${testPath}/${crypto.randomUUID()}${workbookFileExtension}` as DriveItemPath;
	const driveRef = getDefaultDriveRef();

	info("Creating file...");
	const workbookRef = await createWorkbookAndOpenSession(driveRef, testFile);

	info("Listing files...");
	const [itemList] = await execute(listDriveItems(driveRef, testPath));
	for (const driveItem of itemList.value) {
		info(` - ${driveItem.name}`);
	}

	info("Deleting file...");
	await closeSessionAndDeleteWorkbook(workbookRef);

	info("Done.");
}
