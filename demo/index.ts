import listDrives from "../src/operations/drive/listDrives.ts";
import listDriveItems from "../src/operations/driveItem/listDriveItems.ts";
import getWorkbookPivotTable from "../src/operations/workbookPivotTable/getWorkbookPivotTable.ts";
import getDriveItemByPath from "../src/operations/driveItem/getDriveItemByPath.ts";
import { getDefaultDriveRef } from "../src/services/drive.ts";
import { driveItemPath } from "../src/services/driveItem.ts";
import { info } from "./log.ts";
import { WorkbookPivotTableRef } from "../src/models/WorkbookPivotTableRef.ts";

info("Creating folder...");
const driveRef = getDefaultDriveRef();
console.log(driveRef);
const driveList = await listDrives();
// for (const drive of driveList) {
// 	console.log(drive);
// }
// const driveItemList = await listDriveItems(driveRef);
// for (const driveItem of driveItemList) {
// 	if (driveItem.folder)
// 		console.log(`${driveItem.folder}: ${driveItem.id}`);
// }

//PivotTable1
const workbookPath = driveItemPath("erhan-dev", "PivotTable-Test.xlsx");
const workbookRef = await getDriveItemByPath(driveRef, workbookPath);
console.log(workbookRef);

// workbookPivotTableRef(workbookRef, worksheetRef, "PivotTable1");
// const pivotTable = await getWorkbookPivotTable({

// } as WorkbookPivotTableRef);
// console.log(pivotTable);
// const retrievedFolder = await getDriveItemByPath(getDefaultDriveRef(), folderPath);

// console.log(retrievedFolder);
//const folder = await createFolder(driveRef, generateTempFileName());

// info("Creating workbook...");;
// const workbook = await createWorkbookAndStartSession(folder, generateTempFileName(workbookFileExtension));

// info("Updating range...");
// const worksheet = await getWorkbookWorksheetByName(workbook, "Sheet1");
// const range = await updateWorkbookRange(workbookRangeRef(worksheet, "A1:B2"), {
// 	values: [
// 		[1, 2],
// 		[3, 4]
// 	]
// });
// await updateWorkbookRange(range, { // Could be merged with the above, but demo'ing ref use
// 	format: {
// 		font: {
// 			bold: true
// 		}
// 	}
// });

// info("Listing files...");
// for (const item of await listDriveItems(folder)) {
// 	debug(` - ${item.name}`);
// }

// info("Cleanup...");
// await closeWorkbookSession(workbook);
// await deleteDriveItem(folder);

// info("Done.");
