/**
 * Delete an item from a drive.
 * @module deleteDriveItem
 * @category Operations
 */

import type { DriveItemRef } from "../../models/DriveItem.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import { operation } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Options for deleting a drive item.
 * @property bypassSharedLock If true, bypasses any shared locks on the driveItem (e.g., from a coauthoring session).
 * @property bypassCheckedOut If true, bypasses the checkout condition on the driveItem.
 */
export type DeleteDriveItemOptions = {
	/**
	 * If true, bypasses any shared locks on the driveItem (e.g., from a coauthoring session).
	 */
	bypassSharedLock?: boolean;
	/**
	 * If true, bypasses the checkout condition on the driveItem.
	 */
	bypassCheckedOut?: boolean;
};

/**
 * Delete an item from a drive.
 * @param itemRef Reference to the drive item to be deleted.
 * @param options Optional settings for the delete operation.
 * @see https://learn.microsoft.com/en-us/graph/api/driveitem-delete
 */
export default function deleteDriveItem(itemRef: DriveItemRef, options: DeleteDriveItemOptions = {}): GraphOperation<void> {
	const prefer = [options.bypassSharedLock && "bypass-shared-lock", options.bypassCheckedOut && "bypass-checked-out"].filter(Boolean).join(", ");
	const headers: Record<string, string> = prefer ? { prefer } : {};
	return operation({
		context: itemRef.context,
		method: "DELETE",
		path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}", itemRef),
		headers,
		body: null,
		responseTransform: () => undefined,
	});
}
