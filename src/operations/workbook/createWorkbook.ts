import InvalidArgumentError from "../../errors/InvalidArgumentError.ts";
import { operation } from "../../graphApi.ts";
import type { DriveItemPath } from "../../models/DriveItemPath.ts";
import type { DriveRef } from "../../models/DriveRef.ts";
import type { DriveItem } from "../../models/Dto.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRef } from "../../models/WorkbookRef.ts";
import { driveItemRef, workbookFileExtension } from "../../services/driveItem.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/** Create a new blank workbook. */
export default function createWorkbook(driveRef: DriveRef, itemPath: DriveItemPath): GraphOperation<DriveItem & WorkbookRef> {
    if (!itemPath.endsWith(`.${workbookFileExtension}`)) {
        throw new InvalidArgumentError(`Item path must end with '.${workbookFileExtension}'`);
    }

    return operation({
        method: "PUT",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/root:${itemPath}:/content`, driveRef),
        headers: {
            "content-type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
        body: null, // This is correct, Sharepoint interprets a 0-byte files as a new workbook.
        responseTransform: response => {
            const driveItem = response as DriveItem;

            const itemRef = driveItemRef(driveRef, driveItem.id);

            return {
                ...driveItem,
                ...itemRef
            }
        }
    });
}