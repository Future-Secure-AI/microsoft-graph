import { Container } from "inversify";
import SharepointAccessor from "./services/SharepointAccessor.js";
import SiteId from "./models/sharepoint/SiteId.js";
import DriveId from "./models/sharepoint/DriveId.js";
import WorksheetName from "./models/sharepoint/WorksheetName.js";
import FilePath from "./models/sharepoint/FilePath.js";

const container = new Container({ autoBindInjectable: true });

const sharepointAccessor = container.resolve(SharepointAccessor);

const siteId = SiteId.parse("<INSERT-SITE-ID>");
const driveId = DriveId.parse("<INSERT-DRIVE-ID>");
const filePath = FilePath.parse("<INSERT-FILE-PATH>");
const worksheetName = WorksheetName.parse("<INSERT-WORKSHEET-NAME>");

const sharepoint = await sharepointAccessor.open(siteId);
const itemId = await sharepoint.getItemIdForFile(driveId, filePath);
const workbook = await sharepoint.openWorkbook(driveId, itemId);
const worksheet = await workbook.openWorksheet(worksheetName);
const cells = await worksheet.getUsedRangeValues();

console.log(cells);