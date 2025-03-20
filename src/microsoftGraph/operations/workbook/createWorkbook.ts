import InvalidArgumentError from "../../errors/InvalidArgumentError.ts";
import { operation } from "../../graphApi.ts";
import type { DriveItemPath } from "../../models/DriveItemPath.ts";
import type { DriveRef } from "../../models/DriveRef.ts";
import type { DriveItem } from "../../models/Dto.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import { workbookFileExtension } from "../../services/driveItem.ts";
import { generatePath } from "../../services/templatedPaths.ts";

const emptyWorkbookBase64 = ""; // This is correct, Sharepoint interprets a 0-byte files as a new workbook.

/** Create a new blank workbook. */
export default function createWorkbook(driveRef: DriveRef, itemPath: DriveItemPath): GraphOperation<DriveItem> {
    if (!itemPath.endsWith(`.${workbookFileExtension}`)) {
        throw new InvalidArgumentError(`Item path must end with '.${workbookFileExtension}'`);
    }

    return operation({
        method: "PUT",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/root:${itemPath}:/content`, driveRef),
        headers: {
            "content-type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
        body: emptyWorkbookBase64,
    });
}