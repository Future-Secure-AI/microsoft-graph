import type { DriveItem } from "@microsoft/microsoft-graph-types";
import { operation } from "../../graphApi.ts";
import type { DriveItemId } from "../../models/DriveItemId.ts";
import type { DriveItemPath } from "../../models/DriveItemPath.ts";
import type { DriveItemRef } from "../../models/DriveItemRef.ts";
import type { DriveRef } from "../../models/DriveRef.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import { createDriveItemRef } from "../../services/driveItem.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/** Retrieve the metadata for an item in a drive by file path. If the target file is moved this will cease working. @see https://learn.microsoft.com/en-us/graph/api/driveitem-get */
export default function getDriveItemByPath(driveRef: DriveRef, itemPath: DriveItemPath): GraphOperation<DriveItem & DriveItemRef> {
	return operation({
		contextId: driveRef.contextId,
		method: "GET",
		path: generatePath(`/sites/{site-id}/drives/{drive-id}/root:${itemPath}`, driveRef),
		headers: {},
		body: null,
		responseTransform: (response) => {
			const item = response as DriveItem;
			const itemRef = createDriveItemRef(driveRef, item.id as DriveItemId);

			return {
				...item,
				...itemRef,
			};
		},
	});
}
