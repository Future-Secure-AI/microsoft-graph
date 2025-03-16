import { generatePath, type GraphRequest } from "../api.js";
import type { DriveItemPath } from "../drives/DriveItemPath.js";
import type { DriveRef } from "../drives/DriveRef.js";
import type { DriveItem } from "../models.js";

const emptyWorkbookBase64 = "UEsFBgAAAAAAAAAAAAAAAAAAAAAAAA==";

/** Create a new blank workbook. */
export default function createWorkbook(driveRef: DriveRef, itemPath: DriveItemPath): GraphRequest<DriveItem> {
    return {
        method: "PUT",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/root:${itemPath}:/content`, driveRef),
        headers: {
            "content-type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        },
        body: emptyWorkbookBase64
    };
}