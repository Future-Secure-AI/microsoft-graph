import type { DriveItem } from "@microsoft/microsoft-graph-types";
import { operation } from "../../graphApi.ts";
import type { DriveItemId } from "../../models/DriveItemId.ts";
import type { DriveItemRef } from "../../models/DriveItemRef.ts";
import type { DriveRef } from "../../models/DriveRef.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import { createDriveItemRef } from "../../services/driveItem.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Create a folder in the root of a drive, or in a folder. If it already exists do nothing.
 *
 * @param parentRef - A reference to the parent drive or folder where the folder will be created.
 * @param folderName - The name of the folder to be created.
 * @returns The newly created folder, including its metadata and reference information.
 * @see https://learn.microsoft.com/en-us/graph/api/driveitem-post-children
 */
export default function createFolder(parentRef: DriveRef | DriveItemRef, folderName: string): GraphOperation<DriveItem & DriveItemRef> {
	const pathSegment = (parentRef as DriveItemRef).itemId ? "items/{item-id}" : "root";

	return operation({
		contextId: parentRef.contextId,
		method: "POST",
		path: generatePath(`/sites/{site-id}/drives/{drive-id}/${pathSegment}/children`, parentRef),
		headers: {
			"content-type": "application/json",
		},
		body: {
			name: folderName,
			folder: {},
			"@microsoft.graph.conflictBehavior": "rename", // Do nothing if already exists
		},
		responseTransform: (response) => {
			const item = response as DriveItem;
			const itemRef = createDriveItemRef(parentRef, item.id as DriveItemId);

			return {
				...item,
				...itemRef,
			};
		},
	});
}
