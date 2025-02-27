import type { DriveId, DriveRef, ItemId, ItemRef as DriveItemRef, SiteId, SiteRef, WorksheetName, WorksheetRef as WorkbookWorksheetRef } from "./microsoftGraph/models.js";
import { getUsedRangeValues } from "./microsoftGraph/workbook.js";


const siteId = "<INSERT-SITE-ID>" as SiteId;
const driveId = "<INSERT-DRIVE-ID>" as DriveId;
const itemId = "<INSERT-ITEM-ID>" as ItemId;
const worksheetName = "<INSERT-WORKSHEET-NAME>" as WorksheetName;

const siteReference: SiteRef = {
    site: siteId
};
const driveReference: DriveRef = {
    ...siteReference,
    drive: driveId
};
const itemReference: DriveItemRef = {
    ...driveReference,
    item: itemId
};
const worksheetReference: WorkbookWorksheetRef = {
    ...itemReference,
    worksheet: worksheetName
};
const cells = await getUsedRangeValues(worksheetReference);

console.log(cells.values);
