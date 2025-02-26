import type { DriveId, DriveReference, ItemId, ItemReference, SiteId, SiteReference } from "./services/sharepoint.js";
import { getUsedRangeValues, type WorksheetReference, type WorksheetName } from "./services/workbook.js";

const siteId = "<INSERT-SITE-ID>" as SiteId;
const driveId = "<INSERT-DRIVE-ID>" as DriveId;
const itemId = "<INSERT-ITEM-ID>" as ItemId;
const worksheetName = "<INSERT-WORKSHEET-NAME>" as WorksheetName;

const siteReference: SiteReference = {
    site: siteId
};
const driveReference: DriveReference = {
    ...siteReference,
    drive: driveId
};
const itemReference: ItemReference = {
    ...driveReference,
    item: itemId
};
const worksheetReference: WorksheetReference = {
    ...itemReference,
    worksheet: worksheetName
};
const cells = await getUsedRangeValues(worksheetReference);

console.log(cells.values);
