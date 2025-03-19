import InvalidArgumentError from "../../errors/InvalidArgumentError.js";
import type { DriveItemPath } from "../../models/DriveItemPath.js";
import type { DriveRef } from "../../models/DriveRef.js";
import type { DriveItem } from "../../models/Dto.js";
import type { GraphOperation } from "../../models/GraphOperation.js";
import { workbookFileExtension } from "../../services/driveItem.js";
import { generatePath } from "../../services/templatedPaths.js";

const emptyWorkbookBase64 = ""; // This is correct, Sharepoint interprets a 0-byte files as a new workbook.

/** Create a new blank workbook. */
export default function createWorkbook(driveRef: DriveRef, itemPath: DriveItemPath): GraphOperation<DriveItem> {
    if (!itemPath.endsWith(`.${workbookFileExtension}`)) {
        throw new InvalidArgumentError(`Item path must end with '.${workbookFileExtension}'`);
    }

    return {
        method: "PUT",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/root:${itemPath}:/content`, driveRef),
        headers: {
            "content-type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
        body: emptyWorkbookBase64,
    };
}