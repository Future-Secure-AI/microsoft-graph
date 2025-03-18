
import { execute } from "./microsoftGraph/graphApi.js";
import { openDefaultDrive } from "./microsoftGraph/helpers/openDrive.js";
import { createWorkbookWithSession, } from "./microsoftGraph/helpers/openWorkbook.js";
import type { DriveItemPath } from "./microsoftGraph/models/DriveItemPath.js";
import deleteDriveItem from "./microsoftGraph/operations/driveItem/deleteDriveItem.js";
import listDriveItems from "./microsoftGraph/operations/driveItem/listDriveItems.js";
import closeWorkbookSession from "./microsoftGraph/operations/workbookSession/closeWorkbookSession.js";
import { defaultDriveId, defaultSiteId } from "./microsoftGraph/services/configuration.js";
import { sleep } from "./microsoftGraph/services/sleep.js";

export async function run(): Promise<void> {
	const driveRef = openDefaultDrive();

	const workbookRef = await createWorkbookWithSession(driveRef, `/test/${crypto.randomUUID()}.xlsx` as DriveItemPath);

	const [itemList] = await execute(listDriveItems({ siteId: defaultSiteId, driveId: defaultDriveId }, "/test" as DriveItemPath));

	console.info("Items in /Subfolder:");
	for (const driveItem of itemList.value) {
		console.info(driveItem.name);
	}

	await execute(closeWorkbookSession(workbookRef));
	await sleep(1000); // Close session takes a moment to release the file lock
	await execute(deleteDriveItem(workbookRef));
}
