import type { DriveItem } from "@microsoft/microsoft-graph-types";
import { operation } from "../../graphApi.ts";
import type { DriveItemId } from "../../models/DriveItemId.ts";
import type { DriveItemRef } from "../../models/DriveItemRef.ts";
import type { DriveRef } from "../../models/DriveRef.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import { createDriveItemRef } from "../../services/driveItem.ts";
import { generatePath } from "../../services/templatedPaths.ts";

export type ListDriveItemResponse = {
	"@odata.context": string;
	value: DriveItem[];
	"@odata.nextLink"?: string;
};

/**
 * Retrieve the metadata for items in a drive or folder.
 *
 * @param parentRef - A reference to the parent drive or folder. Defaults to the root drive.
 * @returns An array of drive items, each including its metadata and reference information.
 * @see https://learn.microsoft.com/en-us/graph/api/driveitem-list-children
 */
export default function listDriveItems(parentRef: DriveRef | DriveItemRef): GraphOperation<(DriveItem & DriveItemRef)[]> {
	const pathSegment = (parentRef as DriveItemRef).itemId ? "items/{item-id}" : "root";

	return operation({
		contextId: parentRef.contextId,
		method: "GET",
		path: generatePath(`/sites/{site-id}/drives/{drive-id}/${pathSegment}/children`, parentRef),
		headers: {},
		body: null,
		responseTransform: (response) => {
			const list = response as ListDriveItemResponse;

			const items = list.value.map((item) => {
				const itemRef = createDriveItemRef(parentRef, item.id as DriveItemId);

				return {
					...item,
					...itemRef,
				};
			});

			return items;
		},
	});
}
