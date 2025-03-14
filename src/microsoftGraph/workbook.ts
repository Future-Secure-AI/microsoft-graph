/** GraphAPI Workbook bindings. NO NOT ADD BUSINESS OR MANIPULATION LOGIC HERE! */

import { apiPut } from "./api.js";
import type { DriveRef } from "./drive.js";
import { deleteItem, type ItemPath, type ItemRef } from "./driveItem.js";
import type { DriveItem } from "./models.d.ts";

export type WorkbookSessionId = string & { __brand: "WorkbookSessionId" };
export type WorkbookRef = ItemRef & { sessionId?: WorkbookSessionId }

export function calculateApiHeader(workbookRef: WorkbookRef): [string, string][] {
	const headers: [string, string][] = [];
	if (workbookRef.sessionId) headers.push(["workbook-session-id", workbookRef.sessionId]);
	return headers;
}

/** Create a new blank workbook. */
export async function createWorkbook(driveRef: DriveRef, itemPath: ItemPath): Promise<DriveItem> {
	return await apiPut<DriveItem>(`/sites/{site-id}/drives/{drive-id}/root:${itemPath}:/content`, driveRef, [], Buffer.from("UEsFBgAAAAAAAAAAAAAAAAAAAAAAAA==", "base64"));// Base64 for an empty Excel file (compressed format)
}

/** Delete a workbook. @see https://learn.microsoft.com/en-us/graph/api/driveitem-delete */
export async function deleteWorkbook(workbookRef: WorkbookRef): Promise<void> {
	await deleteItem(workbookRef);
}
