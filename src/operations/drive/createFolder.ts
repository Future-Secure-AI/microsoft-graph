/**
 * Create a folder in the root of a drive, or in a folder. If it already exists do nothing.
 * @module createFolder
 * @category Operations
 */

import type { DriveItem } from "@microsoft/microsoft-graph-types";
import type { ConflictBehavior } from "../../models/ConflictBehavior.ts";
import type { DriveRef } from "../../models/Drive.ts";
import type { DriveItemId, DriveItemRef } from "../../models/DriveItem.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import { createDriveItemRef } from "../../services/driveItem.ts";
import { operation } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Options for creating a folder.
 */
export interface CreateDriveItemOptions {
	conflictBehavior?: ConflictBehavior;
}

/**
 * Create a folder in the root of a drive, or in a folder. If it already exists do nothing.
 * @param parentRef Reference to the parent drive or folder where the folder will be created.
 * @param folderName Name of the folder to be created.
 * @returns The newly created folder.
 * @remarks Parent folder must already exist. Multiple folders cannot be created in a single request
 * @see https://learn.microsoft.com/en-us/graph/api/driveitem-post-children
 */
export default function createFolder(parentRef: DriveRef | DriveItemRef, folderName: string, options: CreateDriveItemOptions = {}): GraphOperation<DriveItem & DriveItemRef> {
	const { conflictBehavior = "fail" } = options;
	const pathSegment = (parentRef as DriveItemRef).itemId ? "items/{item-id}" : "root";

	return operation({
		context: parentRef.context,
		method: "POST",
		path: generatePath(`/sites/{site-id}/drives/{drive-id}/${pathSegment}/children`, parentRef),
		headers: {
			"content-type": "application/json",
		},
		body: {
			name: folderName,
			folder: {},
			"@microsoft.graph.conflictBehavior": conflictBehavior,
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
