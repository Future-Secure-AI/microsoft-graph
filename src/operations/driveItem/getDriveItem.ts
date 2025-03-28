import type { DriveItem } from "@microsoft/microsoft-graph-types";
import { operation } from "../../graphApi.ts";
import type { DriveItemRef } from "../../models/DriveItemRef.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/** Retrieve the metadata for an item in a drive. @see https://learn.microsoft.com/en-us/graph/api/driveitem-get */
export default function getDriveItem(itemRef: DriveItemRef): GraphOperation<DriveItem & DriveItemRef> {
	return operation({
		contextId: itemRef.contextId,
		method: "GET",
		path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}", itemRef),
		headers: {},
		body: null,
		responseTransform: (response) => {
			const item = response as DriveItem;

			return {
				...item,
				...itemRef,
			};
		},
	});
}
