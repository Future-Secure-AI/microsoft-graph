import type { DriveId, DriveReference, ItemId, ItemReference } from "./services/graphApi/drive.js";
import type { SiteId, SiteReference } from "./services/graphApi/site.js";
import { getUsedRangeValues, type WorksheetReference, type WorksheetName } from "./services/graphApi/workbook.js";

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
