
import SharepointAccessor from "./services/SharepointAccessor.js";
import SiteId from "./models/sharepoint/SiteId.js";
import DriveId from "./models/sharepoint/DriveId.js";
import WorksheetName from "./models/sharepoint/WorksheetName.js";
import FilePath from "./models/sharepoint/FilePath.js";
import Commentator from "./commentators/Commentator.js";
import Money from "./models/Money.js";
import { resolve, resolveMany } from "./DependancyInjection.js";

// MULTIPLE DI EXAMPLE
// Gets a service that has multiple instances and invokes each one.

const left = Money.parse(10);
const right = Money.parse(20);

resolveMany(Commentator)
    .flatMap(commentator => commentator.execute(left, right))
    .forEach(comment => console.log(comment));

// SINGLE DI EXAMPLE
// Gets and uses a single service

const sharepointAccessor = resolve(SharepointAccessor);

const siteId = SiteId.parse("<INSERT-SITE-ID>");
const driveId = DriveId.parse("<INSERT-DRIVE-ID>");
const filePath = FilePath.parse("<INSERT-FILE-PATH>");
const worksheetName = WorksheetName.parse("<INSERT-WORKSHEET-NAME>");

const sharepoint = await sharepointAccessor.open(siteId); // <== This wil error, since we don't have creds available yet
const itemId = await sharepoint.getItemIdForFile(driveId, filePath);
const workbook = await sharepoint.openWorkbook(driveId, itemId);
const worksheet = await workbook.openWorksheet(worksheetName);
const cells = await worksheet.getUsedRangeValues();

console.log(cells);
