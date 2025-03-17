import type { DriveItemPath } from "../model/DriveItemPath.js";
import type { DriveRef } from "../model/DriveRef.js";
import type { GraphOperation } from "../model/GraphOperation.js";
import type { GraphOptions } from "../model/GraphOptions.js";
import type { DriveItem } from "../model/models.js";
import generatePath from "../utils/generatePath.js";

const emptyWorkbookBase64 = "UEsFBgAAAAAAAAAAAAAAAAAAAAAAAA==";

/** Create a new blank workbook. */
export default function createWorkbook(driveRef: DriveRef, itemPath: DriveItemPath, opts?: GraphOptions): GraphOperation<DriveItem> {
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