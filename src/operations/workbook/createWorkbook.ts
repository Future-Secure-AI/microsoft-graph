import type { DriveItem } from "@microsoft/microsoft-graph-types";
import InvalidArgumentError from "../../errors/InvalidArgumentError.ts";
import { operation } from "../../graphApi.ts";
import type { DriveItemId } from "../../models/DriveItemId.ts";
import type { DriveItemPath } from "../../models/DriveItemPath.ts";
import type { DriveItemRef } from "../../models/DriveItemRef.ts";
import type { DriveRef } from "../../models/DriveRef.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRef } from "../../models/WorkbookRef.ts";
import { createDriveItemRef, workbookFileExtension } from "../../services/driveItem.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Create a new blank workbook.
 *
 * @param parentRef - A reference to the parent drive or folder where the workbook will be created.
 * @param itemPath - The path (including the filename) for the new workbook. Must end with `.xlsx`.
 * @returns The newly created workbook, including its metadata and reference information.
 * @throws InvalidArgumentError if the item path does not end with `.xlsx`.
 * @see https://learn.microsoft.com/en-us/graph/api/driveitem-put-content
 */
export default function createWorkbook(parentRef: DriveRef | DriveItemRef, itemPath: DriveItemPath): GraphOperation<DriveItem & WorkbookRef> {
	if (!itemPath.endsWith(`.${workbookFileExtension}`)) {
		throw new InvalidArgumentError(`Item path must end with '.${workbookFileExtension}'`);
	}
	const pathSegment = (parentRef as DriveItemRef).itemId ? "items/{item-id}" : "root";

	return operation({
		contextId: parentRef.contextId,
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
