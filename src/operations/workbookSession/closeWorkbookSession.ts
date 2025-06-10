/**
 * Close an existing workbook session.
 * @module closeWorkbookSession
 * @category Operations
 */

import InvalidArgumentError from "../../errors/InvalidArgumentError.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRef } from "../../models/WorkbookRef.ts";
import { operation } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Close an existing workbook session.
 * @param workbookRef Reference to the workbook.
 *  * @throws {@link InvalidArgumentError} if the session ID is not provided.
 * @see https://learn.microsoft.com/en-us/graph/api/workbook-closesession
 */
export default function closeWorkbookSession(workbookRef: WorkbookRef): GraphOperation<void> {
	if (!workbookRef.sessionId) {
		throw new InvalidArgumentError("Workbook session ID is required to close a session.");
	}
	return operation({
		context: workbookRef.context,
		method: "POST",
		path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/closeSession", workbookRef),
		headers: {
			"workbook-session-id": workbookRef.sessionId,
		},
		body: null,
		responseTransform: () => undefined,
	});
}
