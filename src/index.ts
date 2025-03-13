import { fileURLToPath } from "url";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import type { DriveId, ItemId } from "./microsoftGraph/drive.js";
import type { SiteId } from "./microsoftGraph/site.js";
import { getUsedRangeValues, type WorksheetName } from "./microsoftGraph/workbook.js";

export type Arguments = {
	siteId: SiteId;
	driveId: DriveId;
	itemId: ItemId;
	worksheetName: WorksheetName;
};

/*
 * Core logic goes here. But don't call this function directly - use `runNative` or `runCli` instead.
 */
const run = async (args: Arguments) => {
	// TODO: Core logic
	const cells = await getUsedRangeValues({
		site: args.siteId,
		drive: args.driveId,
		item: args.itemId,
		worksheet: args.worksheetName,
	});

	console.info(cells.values);
};

/*
 * Called by Flowise during normal use.
 */
export const runNative = async (args: Arguments): Promise<string[]> => {
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
};

/*
 * Called by CLI during development.
 */
const runCli = async () => {
	const args = await yargs(hideBin(process.argv))
		.options({
			siteId: { type: "string", demandOption: true, coerce: (v) => v as SiteId },
			driveId: { type: "string", demandOption: true, coerce: (v) => v as DriveId },
			itemId: { type: "string", demandOption: true, coerce: (v) => v as ItemId },
			worksheetName: { type: "string", demandOption: true, coerce: (v) => v as WorksheetName },
		})
		.parse();

	await run(args);
};

const isCliInvoked = process.argv[1] === fileURLToPath(import.meta.url);
if (isCliInvoked) await runCli();
