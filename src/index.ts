import { fileURLToPath } from "url";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import type { DriveId, SiteId } from "./microsoftGraph/drive.js";
import type { ItemId } from "./microsoftGraph/driveItem.js";
import type { WorkbookRef } from "./microsoftGraph/workbook.js";
import { getUsedRange } from "./microsoftGraph/workbookRange.js";
import { closeWorkbookSession, createWorkbookSession } from "./microsoftGraph/workbookSession.js";
import type { WorksheetId, WorksheetRef } from "./microsoftGraph/workbookWorksheet.js";

export type Arguments = {
	siteId: SiteId;
	driveId: DriveId;
	itemId: ItemId;
	worksheetId: WorksheetId;
};

/** Core logic goes here. But don't call this function directly - use `runNative` or `runCli` instead. */
async function run(args: Arguments): Promise<void> {
	//
	// TODO: Core logic goes here...
	//

	const workbookRef: WorkbookRef = {
		siteId: args.siteId,
		driveId: args.driveId,
		itemId: args.itemId,
	};

	const sessionId = await createWorkbookSession(workbookRef); // Optional, but improved performance on subsequent requests

	const worksheetRef: WorksheetRef = {
		...workbookRef,
		worksheetId: args.worksheetId,
		sessionId: sessionId,
	}

	const cells = await getUsedRange(worksheetRef);

	await closeWorkbookSession(workbookRef);

	console.info(cells.values);
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
			siteId: { type: "string", demandOption: true, coerce: (v) => v as SiteId },
			driveId: { type: "string", demandOption: true, coerce: (v) => v as DriveId },
			itemId: { type: "string", demandOption: true, coerce: (v) => v as ItemId },
			worksheetId: { type: "string", demandOption: true, coerce: (v) => v as WorksheetId },
		})
		.parse();

	await run(args);
}

const isCliInvoked = process.argv[1] === fileURLToPath(import.meta.url);
if (isCliInvoked) await runCli();
