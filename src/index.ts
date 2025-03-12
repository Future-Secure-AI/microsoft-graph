import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import type { DriveId, DriveRef, ItemId, ItemRef } from "./microsoftGraph/drive.js";
import type { SiteId, SiteRef } from "./microsoftGraph/site.js";
import { getUsedRangeValues, type WorksheetName, type WorksheetRef } from "./microsoftGraph/workbook.js";

const argv = await yargs(hideBin(process.argv))
	.options({
		siteId: { type: "string", demandOption: true, coerce: (v) => v as SiteId },
		driveId: { type: "string", demandOption: true, coerce: (v) => v as DriveId },
		itemId: { type: "string", demandOption: true, coerce: (v) => v as ItemId },
		worksheetName: { type: "string", demandOption: true, coerce: (v) => v as WorksheetName },
	})
	.parse();

const siteReference: SiteRef = {
	site: argv.siteId,
};
const driveReference: DriveRef = {
	...siteReference,
	drive: argv.driveId,
};
const itemReference: ItemRef = {
	...driveReference,
	item: argv.itemId,
};
const worksheetReference: WorksheetRef = {
	...itemReference,
	worksheet: argv.worksheetName,
};
const cells = await getUsedRangeValues(worksheetReference);

console.log(cells.values);
