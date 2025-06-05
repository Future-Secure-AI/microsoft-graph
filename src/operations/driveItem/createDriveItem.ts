import type { DriveItem } from "@microsoft/microsoft-graph-types";
import { operation } from "../../graphApi.ts";
import type { DriveItemId } from "../../models/DriveItemId.ts";
import type { DriveItemPath } from "../../models/DriveItemPath.ts";
import type { DriveItemRef } from "../../models/DriveItemRef.ts";
import type { DriveRef } from "../../models/DriveRef.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import { createDriveItemRef } from "../../services/driveItem.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Creates new drive item in the specified parent drive or folder. If the file already exists, it will be replaced.
 *
 * @param parentRef - A reference to the parent drive or folder where the workbook will be created.
 * @param itemPath - The path (including the filename) for the new workbook.
 * @returns The newly created workbook, including its metadata and reference information.
 * @see https://learn.microsoft.com/en-us/graph/api/driveitem-put-content
 */
export default function createDriveItem(parentRef: DriveRef | DriveItemRef, itemPath: DriveItemPath, contextType: string, content: ArrayBuffer): GraphOperation<DriveItem & DriveItemRef> {
	const pathSegment = (parentRef as DriveItemRef).itemId ? "items/{item-id}" : "root";

	return operation({
		context: parentRef.context,
		method: "PUT",
		path: generatePath(`/sites/{site-id}/drives/{drive-id}/${pathSegment}:/${itemPath}:/content`, parentRef),
		headers: {
			"content-type": contextType,
		},
		body: content,
		responseTransform: (response) => {
			const driveItem = response as DriveItem;

			const itemRef = createDriveItemRef(parentRef, driveItem.id as DriveItemId);

			return {
				...driveItem,
				...itemRef,
			};
		},
	});
}
