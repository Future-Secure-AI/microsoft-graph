import type { DriveId, ItemId, SiteId } from "./services/sharepoint.js";
import { getUsedRangeValues, type WorksheetName } from "./services/workbook.js";

const siteId = "<INSERT-SITE-ID>" as SiteId;
const driveId = "<INSERT-DRIVE-ID>" as DriveId;
const itemId = "<INSERT-ITEM-ID>" as ItemId;
const worksheetName = "<INSERT-WORKSHEET-NAME>" as WorksheetName;

const worksheetReference = {
    siteId,
    driveId,
    itemId,
    worksheetName
};
const cells = await getUsedRangeValues(worksheetReference);

console.log(cells.values);
