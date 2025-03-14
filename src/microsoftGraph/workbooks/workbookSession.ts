/** GraphAPI Workbook Session bindings. NO NOT ADD BUSINESS OR MANIPULATION LOGIC HERE! */

import { apiPost } from "../api.js";
import InvalidArgumentError from "../errors/InvalidArgumentError.js";
import { type WorkbookRef, calculateApiHeader } from "./workbook.js";

export type WorkbookSessionId = string & { __brand: "WorkbookSessionId" };

/** Create a new workbook session. Typically the persistent session expires after about 5 minutes of inactivity. Non persistent session expires after about 7 minutes of inactivity. Most performant with `persistChanges = true`. @see https://learn.microsoft.com/en-us/graph/api/workbook-createsession @see https://learn.microsoft.com/en-us/graph/api/resources/excel#usage */
export async function createWorkbookSession(workbookRef: WorkbookRef, persistChanges = true): Promise<WorkbookSessionId> {
    const response = await apiPost<{ id: WorkbookSessionId; }>("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/createSession", workbookRef, calculateApiHeader(workbookRef), { persistChanges });
    return response.id;
}

/** Refresh a workbook session. @see https://learn.microsoft.com/en-us/graph/api/workbook-refreshsession */
export async function refreshWorkbookSession(workbookRef: WorkbookRef): Promise<void> {
    if (!workbookRef.sessionId) throw new InvalidArgumentError("Workbook session ID is required to refresh a session.");
    await apiPost("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/refreshSession", workbookRef, calculateApiHeader(workbookRef), {});
}

/** Close an existing workbook session. @see https://learn.microsoft.com/en-us/graph/api/workbook-closesession */
export async function closeWorkbookSession(workbookRef: WorkbookRef): Promise<void> {
    if (!workbookRef.sessionId) throw new InvalidArgumentError("Workbook session ID is required to close a session.");
    await apiPost("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/closeSession", workbookRef, calculateApiHeader(workbookRef), {});
}
