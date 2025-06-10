/**
 * Create a new blank workbook.
 * @module createWorkbook
 * @category Operations
 */

import type { DriveItem } from "@microsoft/microsoft-graph-types";
import InvalidArgumentError from "../../errors/InvalidArgumentError.ts";
import type { DriveRef } from "../../models/Drive.ts";
import type { DriveItemId, DriveItemPath, DriveItemRef } from "../../models/DriveItem.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRef } from "../../models/Workbook.ts";
import { createDriveItemRef, workbookFileExtension } from "../../services/driveItem.ts";
import { operation } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Create a new blank workbook.
 * @param parentRef Reference to the parent drive or folder where the workbook will be created.
 * @param itemPath Path (including the filename) for the new workbook. Must end with `.xlsx`.
 * @returns Newly created workbook.
 * @throws {@link InvalidArgumentError} if the item path does not end with `.xlsx`.
 * @see https://learn.microsoft.com/en-us/graph/api/driveitem-put-content
 */
export default function createWorkbook(parentRef: DriveRef | DriveItemRef, itemPath: DriveItemPath): GraphOperation<DriveItem & WorkbookRef> {
	if (!itemPath.endsWith(`.${workbookFileExtension}`)) {
		throw new InvalidArgumentError(`Item path must end with '.${workbookFileExtension}'`);
	}
	const pathSegment = (parentRef as DriveItemRef).itemId ? "items/{item-id}" : "root";

	return operation({
		context: parentRef.context,
		method: "PUT",
		path: generatePath(`/sites/{site-id}/drives/{drive-id}/${pathSegment}:/${itemPath}:/content`, parentRef),
		headers: {
			"content-type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		},
		body: null, // This is correct, Sharepoint interprets a 0-byte files as a new workbook.
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
