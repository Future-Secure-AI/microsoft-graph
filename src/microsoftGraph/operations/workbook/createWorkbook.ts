import type { DriveItemPath } from "../../models/DriveItemPath.js";
import type { DriveRef } from "../../models/DriveRef.js";
import type { DriveItem } from "../../models/Dto.js";
import type { GraphOperation } from "../../models/GraphOperation.js";
import type { GraphOptions } from "../../models/GraphOptions.js";
import { excelContentType } from "../../services/contentTypes.js";
import { generatePath } from "../../services/templatedPaths.js";

const emptyWorkbookBase64 = "";

/** Create a new blank workbook. */
export default function createWorkbook(driveRef: DriveRef, itemPath: DriveItemPath, opts?: GraphOptions): GraphOperation<DriveItem> {
    return {
        method: "PUT",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/root:${itemPath}:/content`, driveRef),
        headers: {
            "content-type": excelContentType,
        },
        body: emptyWorkbookBase64,
        dependsOn: opts?.dependsOn,
    };
}