import { operation } from "../../graphApi.ts";
import type { DriveItemRef } from "../../models/DriveItemRef.ts";
import type { DriveRef } from "../../models/DriveRef.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Moves a file to a new location in the same drive.
 *
 * @param srcFileRef - A reference to the source file to be copied.
 * @param dstFolderRef - A reference to the destination folder or site (if targeting root).
 * @param dstFileName - The name of the copied file.
 * @returns new DriveItemRef.
 * @see https://learn.microsoft.com/en-us/graph/api/driveitem-move
 */
export default function moveDriveItem(srcFileRef: DriveItemRef, dstFolderRef: DriveRef | DriveItemRef, dstFileName: string): GraphOperation<void> {
	return operation({
		contextId: srcFileRef.contextId,
		method: "PATCH",
		path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}", srcFileRef),
		headers: {
			"content-type": "application/json",
		},
		body: {
			name: dstFileName,
			parentReference: {
				siteId: dstFolderRef.siteId,
				driveId: dstFolderRef.driveId,
				id: "itemId" in dstFolderRef ? dstFolderRef.itemId : "root",
			},
		},
		responseTransform: () => undefined,
	});
}
