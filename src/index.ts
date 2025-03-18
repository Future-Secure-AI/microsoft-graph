// biome-ignore lint/correctness/noNodejsModules: Better way to do this?
import { fileURLToPath } from "node:url";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { execute } from "./microsoftGraph/graphApi.js";
import { openDefaultDrive } from "./microsoftGraph/helpers/openDrive.js";
import { createWorkbookWithSession, } from "./microsoftGraph/helpers/openWorkbook.js";
import type { DriveItemId } from "./microsoftGraph/models/DriveItemId.js";
import type { DriveItemPath } from "./microsoftGraph/models/DriveItemPath.js";
import type { WorkbookWorksheetId } from "./microsoftGraph/models/WorkbookWorksheetId.js";
import deleteDriveItem from "./microsoftGraph/operations/driveItem/deleteDriveItem.js";
import listDriveItems from "./microsoftGraph/operations/driveItem/listDriveItems.js";
import closeWorkbookSession from "./microsoftGraph/operations/workbookSession/closeWorkbookSession.js";
import { defaultDriveId, defaultSiteId } from "./microsoftGraph/services/configuration.js";
import { sleep } from "./microsoftGraph/services/sleep.js";

export type Arguments = {
	itemId: DriveItemId;
	worksheetId: WorkbookWorksheetId;
};

/** Core logic goes here. But don't call this function directly - use `runNative` or `runCli` instead. */
async function run(args: Arguments): Promise<void> {
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

/** Called by Flowise during normal use. */
export async function runNative(args: Arguments): Promise<string[]> {
	const info = console.info;
	const warn = console.warn;
	const error = console.error;

	const messages: string[] = [];

	console.info = (message: string): void => {
		messages.push(`[INFO] ${message}`);
		info(message);
	};
	console.warn = (message: string): void => {
		messages.push(`[WARN] ${message}`);
		warn(message);
	};
	console.error = (message: string): void => {
		messages.push(`[ERROR] ${message}`);
		error(message);
	};

	await run(args);
	return messages;
}

/** Called by CLI during development. */
async function runCli(): Promise<void> {
	const args = await yargs(hideBin(process.argv))
		.options({
			itemId: { type: "string", demandOption: true, coerce: (v) => v as DriveItemId },
			worksheetId: { type: "string", demandOption: true, coerce: (v) => v as WorkbookWorksheetId },
		})
		.parse();

	await run(args);
}

process.nextTick(async () => {
	if (process.argv[1] === fileURLToPath(import.meta.url)) {
		await runCli();
	}
});
