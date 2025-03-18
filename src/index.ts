
import { info } from "./log.js";
import { execute } from "./microsoftGraph/graphApi.js";
import closeSessionAndDeleteWorkbook from "./microsoftGraph/helpers/closeSessionAndDeleteWorkbook.js";
import createWorkbookAndOpenSessionAndGetRef from "./microsoftGraph/helpers/createWorkbookAndOpenSessionAndGetRef.js";
import getDefaultDriveRef from "./microsoftGraph/helpers/getDefaultDriveRef.js";
import type { DriveItemPath } from "./microsoftGraph/models/DriveItemPath.js";
import listDriveItems from "./microsoftGraph/operations/driveItem/listDriveItems.js";
import { workbookFileExtension, } from "./microsoftGraph/services/workbookFile.js";

export async function run(): Promise<void> {
	const testPath = "/test" as DriveItemPath;
	const testFile = `/${testPath}/${crypto.randomUUID()}${workbookFileExtension}` as DriveItemPath;
	const driveRef = getDefaultDriveRef();

	info("Creating file...");
	const workbookRef = await createWorkbookAndOpenSessionAndGetRef(driveRef, testFile);

	info("Listing files...");
	const [itemList] = await execute(listDriveItems(driveRef, testPath));
	for (const driveItem of itemList.value) {
		info(` - ${driveItem.name}`);
	}

	info("Deleting file...");
	await closeSessionAndDeleteWorkbook(workbookRef);

	info("Done.");
}
