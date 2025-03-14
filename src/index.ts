import { fileURLToPath } from "url";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import type { DriveId, ItemId, SiteId } from "./microsoftGraph/drive.js";
import { closeSession, createSession, getUsedRangeValues, type WorkbookRef, type WorksheetId, type WorksheetRef } from "./microsoftGraph/workbook.js";

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

	workbookRef.sessionId = await createSession({ // Optional, but improved performance on subsequent requests
		siteId: args.siteId,
		driveId: args.driveId,
		itemId: args.itemId,
	});

	const worksheetRef: WorksheetRef = {
		...workbookRef,
		worksheetId: args.worksheetId,
	}

	const cells = await getUsedRangeValues(worksheetRef);

	await closeSession(workbookRef);

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
