import InvalidArgumentError from "../../errors/InvalidArgumentError.ts";
import { operation } from "../../graphApi.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRef } from "../../models/WorkbookRef.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Refresh a workbook session.
 *
 * @param workbookRef - A reference to the workbook, optionally including session information. The session ID is required.
 * @returns Nothing.
 * @throws InvalidArgumentError if the session ID is not provided.
 * @see https://learn.microsoft.com/en-us/graph/api/workbook-refreshsession
 */
export default function refreshWorkbookSession(workbookRef: WorkbookRef): GraphOperation<void> {
	if (!workbookRef.sessionId) {
		throw new InvalidArgumentError("Workbook session ID is required to refresh a session.");
	}
	return operation({
		contextId: workbookRef.contextId,
		method: "POST",
		path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/refreshSession", workbookRef),
		headers: {
			"workbook-session-id": workbookRef.sessionId,
			"content-type": "application/json",
		},
		body: null,
		responseTransform: () => undefined,
	});
}
