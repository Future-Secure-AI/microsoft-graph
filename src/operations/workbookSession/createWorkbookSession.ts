/**
 * Create a new workbook session.
 * @module createWorkbookSession
 * @category Operations
 */

import type { DriveItemRef } from "../../models/DriveItem.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRef } from "../../models/Workbook.ts";
import type { WorkbookSessionId } from "../../models/WorkbookSession.ts";
import { operation } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Create a new workbook session.
 * @param itemRef Reference to the workbook item.
 * @param persistChanges Boolean indicating whether changes should persist across sessions. Defaults to true.
 * @returns Reference to the workbook, including the session ID.
 * @see https://learn.microsoft.com/en-us/graph/api/workbook-createsession
 * @see https://learn.microsoft.com/en-us/graph/api/resources/excel#usage
 */
export default function createWorkbookSession(itemRef: DriveItemRef, persistChanges = true): GraphOperation<WorkbookRef> {
	return operation({
		context: itemRef.context,
		method: "POST",
		path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/createSession", itemRef),
		headers: {
			"content-type": "application/json",
		},
		body: {
			persistChanges,
		},
		responseTransform: (response) => {
			const session = response as { id: WorkbookSessionId };

			return {
				...itemRef,
				sessionId: session.id,
			};
		},
	});
}
