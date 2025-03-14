/** GraphAPI Workbook bindings. NO NOT ADD BUSINESS OR MANIPULATION LOGIC HERE! */

import { apiPut } from "../api.js";
import type { DriveRef } from "../drives/drive.js";
import { deleteItem, type DriveItemPath, type DriveItemRef } from "../drives/driveItem.js";
import type { DriveItem } from "../models.js";
import type { WorkbookSessionId } from "./workbookSession.js";

export type WorkbookRef = DriveItemRef & { sessionId?: WorkbookSessionId }

const emptyWorkbookBase64 = "UEsFBgAAAAAAAAAAAAAAAAAAAAAAAA==";

export function calculateApiHeader(workbookRef: WorkbookRef): [string, string][] {
	const headers: [string, string][] = [];
	if (workbookRef.sessionId) headers.push(["workbook-session-id", workbookRef.sessionId]);
	return headers;
}


/** Create a new blank workbook. */
export async function createWorkbook(driveRef: DriveRef, itemPath: DriveItemPath): Promise<DriveItem> {
	return await apiPut<DriveItem>(`/sites/{site-id}/drives/{drive-id}/root:${itemPath}:/content`, driveRef, [], Buffer.from(emptyWorkbookBase64, "base64"));
}

/** Delete a workbook. @see https://learn.microsoft.com/en-us/graph/api/driveitem-delete */
export async function deleteWorkbook(workbookRef: WorkbookRef): Promise<void> {
	await deleteItem(workbookRef);
}
