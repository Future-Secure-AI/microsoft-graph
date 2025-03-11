import type {
  DriveId,
  DriveRef,
  ItemId,
  ItemRef,
} from "./microsoftGraph/drive.js";
import type { SiteId, SiteRef } from "./microsoftGraph/site.js";
import {
  getUsedRangeValues,
  type WorksheetName,
  type WorksheetRef,
} from "./microsoftGraph/workbook.js";

const siteId = "<INSERT-SITE-ID>" as SiteId;
const driveId = "<INSERT-DRIVE-ID>" as DriveId;
const itemId = "<INSERT-ITEM-ID>" as ItemId;
const worksheetName = "<INSERT-WORKSHEET-NAME>" as WorksheetName;

const siteReference: SiteRef = {
  site: siteId,
};
const driveReference: DriveRef = {
  ...siteReference,
  drive: driveId,
};
const itemReference: ItemRef = {
  ...driveReference,
  item: itemId,
};
const worksheetReference: WorksheetRef = {
  ...itemReference,
  worksheet: worksheetName,
};
const cells = await getUsedRangeValues(worksheetReference);

console.log(cells.values);
