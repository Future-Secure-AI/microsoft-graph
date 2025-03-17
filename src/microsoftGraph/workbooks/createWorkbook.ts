import type { DriveItemPath } from "../drives/driveItem/DriveItemPath.js";
import type { DriveRef } from "../drives/DriveRef.js";
import type { GraphOptions } from "../GraphOptions.js";
import type { GraphRequest } from "../GraphRequest.js";
import type { DriveItem } from "../models.js";
import generatePath from "../utils/generatePath.js";

const emptyWorkbookBase64 = "UEsFBgAAAAAAAAAAAAAAAAAAAAAAAA==";

/** Create a new blank workbook. */
export default function createWorkbook(driveRef: DriveRef, itemPath: DriveItemPath, opts?: GraphOptions): GraphRequest<DriveItem> {
    return {
        method: "PUT",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/root:${itemPath}:/content`, driveRef),
        headers: {
            "content-type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        },
        body: emptyWorkbookBase64,
        dependsOn: opts?.dependsOn,
    };
}