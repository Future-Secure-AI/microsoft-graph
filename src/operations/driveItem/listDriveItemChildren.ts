/**
 * Retrieve the metadata for items in a drive or folder.
 * @module listDriveItemChildren
 * @category Operations
 */

import type { DriveItem } from "@microsoft/microsoft-graph-types";
import type { DriveItemId } from "../../models/DriveItemId.ts";
import type { DriveItemRef } from "../../models/DriveItemRef.ts";
import type { DriveRef } from "../../models/DriveRef.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import { createDriveItemRef } from "../../services/driveItem.ts";
import { operation } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";

export type ListDriveItemResponse = {
	value: (DriveItem & DriveItemRef)[];
	"@odata.nextLink": string | null;
};

/**
 * Retrieve the metadata for items in a drive or folder.
 * @param parentRef Reference to the parent drive or folder. Defaults to the root drive.
 * @param take Maximum number of items to retrieve. Defaults to 1000.
 * @returns Array of drive items, each including its metadata and reference information.
 * @see https://learn.microsoft.com/en-us/graph/api/driveitem-list-children
 */
export default function listDriveItemChildren(parentRef: DriveRef | DriveItemRef, take = 1000): GraphOperation<ListDriveItemResponse> {
	const pathSegment = (parentRef as DriveItemRef).itemId ? "items/{item-id}" : "root";

	return operation({
		context: parentRef.context,
		method: "GET",
		path: generatePath(`/sites/{site-id}/drives/{drive-id}/${pathSegment}/children?$top=${take}`, parentRef),
		headers: {},
		body: null,
		responseTransform: (response) => {
			const result = response as ListDriveItemResponse;

			return {
				value: result.value.map((item) => {
					const itemRef = createDriveItemRef(parentRef, item.id as DriveItemId);

					return {
						...item,
						...itemRef,
					};
				}),
				"@odata.nextLink": result["@odata.nextLink"] ?? null,
			};
		},
	});
}
