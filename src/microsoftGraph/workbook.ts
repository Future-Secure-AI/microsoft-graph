import { apiDelete, apiGet, apiPatch, apiPost, apiPut } from "./api.js";
import { deleteItem, type DriveRef, type ItemPath, type ItemRef } from "./drive.js";
import InvalidArgumentError from "./InvalidArgumentError.js";
import type { DriveItem, WorkbookRange, WorkbookWorksheet } from "./models.d.ts";

export type WorkbookSessionId = string & { __brand: "WorkbookSessionId" };
export type WorkbookRef = ItemRef & { sessionId?: WorkbookSessionId }

export type WorksheetId = string & { __brand: "WorksheetId" };
export type WorksheetName = string & { __brand: "WorksheetName" };
export type WorksheetRef = WorkbookRef & { worksheetId: WorksheetId };

export type RangeId = string & { __brand: "RangeId" };
export type RangeName = string & { __brand: "RangeName" };
// export type RangeRef = WorkbookRef & { rangeId: RangeId };

export type CellValue = string | number | boolean | null | Date;
export type RangeValues = CellValue[][];

export type ListWorksheetResponse = {
	value: WorkbookWorksheet[];
};

function calculateHeader(workbookRef: WorkbookRef): [string, string][] {
	const headers: [string, string][] = [];
	if (workbookRef.sessionId) headers.push(["workbook-session-id", workbookRef.sessionId]);
	return headers;
}

/** Create a new workbook in a drive. NOTE: This appears not to be documented in Microsoft Learn. */
export async function createWorkbook(driveRef: DriveRef, itemPath: ItemPath): Promise<DriveItem> {
	return await apiPut<DriveItem>(`/sites/{site-id}/drives/{drive-id}/root:${itemPath}:/content`, driveRef, [], Buffer.from([]));
}

/** Delete a workbook. @see https://learn.microsoft.com/en-us/graph/api/driveitem-delete */
export async function deleteWorkbook(workbookRef: WorkbookRef): Promise<void> {
	await deleteItem(workbookRef);
}

/** Create a new workbook session. Typically the persistent session expires after about 5 minutes of inactivity. Non persistent session expires after about 7 minutes of inactivity. Most performant with `persistChanges = true`. @see https://learn.microsoft.com/en-us/graph/api/workbook-createsession @see https://learn.microsoft.com/en-us/graph/api/resources/excel#usage */
export async function createSession(workbookRef: WorkbookRef, persistChanges = true): Promise<WorkbookSessionId> {
	const response = await apiPost<{ id: WorkbookSessionId }>("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/createSession", workbookRef, calculateHeader(workbookRef), { persistChanges });
	return response.id;
}

/** Refresh a workbook session. @see https://learn.microsoft.com/en-us/graph/api/workbook-refreshsession */
export async function refreshSession(workbookRef: WorkbookRef): Promise<void> {
	if (!workbookRef.sessionId) throw new InvalidArgumentError("Workbook session ID is required to refresh a session.");
	await apiPost("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/refreshSession", workbookRef, calculateHeader(workbookRef), {});
}

/** Close an existing workbook session. @see https://learn.microsoft.com/en-us/graph/api/workbook-closesession */
export async function closeSession(workbookRef: WorkbookRef): Promise<void> {
	if (!workbookRef.sessionId) throw new InvalidArgumentError("Workbook session ID is required to close a session.");
	await apiPost("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/closeSession", workbookRef, calculateHeader(workbookRef), {});
}

/** Retrieve a list of worksheets in a given workbook. @see https://learn.microsoft.com/en-us/graph/api/worksheet-list */
export async function listWorksheets(workbookRef: WorkbookRef): Promise<ListWorksheetResponse> {
	return await apiGet<ListWorksheetResponse>("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets", workbookRef, calculateHeader(workbookRef));
}

/** Create a new worksheet in a given workbook. @see https://learn.microsoft.com/en-us/graph/api/worksheetcollection-add */
export async function createWorksheet(workbookRef: WorkbookRef, name: string): Promise<WorkbookWorksheet> {
	return await apiPost<WorkbookWorksheet>("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/add", workbookRef, calculateHeader(workbookRef), { name });
}

/** Update the properties of a worksheet object. @see https://learn.microsoft.com/en-us/graph/api/worksheet-update */
export async function updateWorksheet(worksheetRef: WorksheetRef, updates: { name?: string; position?: number; visibility?: "Visible" | "Hidden" | "VeryHidden" }): Promise<WorkbookWorksheet> {
	return await apiPatch<WorkbookWorksheet>("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheet/{worksheet-id}", worksheetRef, calculateHeader(worksheetRef), updates);
}

/** Delete a worksheet from a workbook. @see https://learn.microsoft.com/en-us/graph/api/worksheet-delete */
export async function deleteWorksheet(worksheetRef: WorksheetRef): Promise<void> {
	await apiDelete("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheet/{worksheet-id}", worksheetRef, calculateHeader(worksheetRef));
}

/** Retrieve the used range of the given worksheet. @see https://learn.microsoft.com/en-us/graph/api/range-usedrange */
export async function getUsedRangeValues(worksheetRef: WorksheetRef): Promise<WorkbookRange> {
	return await apiGet<WorkbookRange>("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheet/{worksheet-id}/range/usedRange", worksheetRef, calculateHeader(worksheetRef));
}

/** Retrieve a named range. @see https://learn.microsoft.com/en-us/graph/api/range-get */
export async function getNamedRangeValues(workbookRef: WorkbookRef, rangeName: RangeName): Promise<WorkbookRange> {
	return await apiGet<WorkbookRange>("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/names/{range-name}/range", { ...workbookRef, rangeName }, calculateHeader(workbookRef));
}

/** Update a named range. @see https://learn.microsoft.com/en-us/graph/api/range-update */
export async function setNamedRangeValues(workbookRef: WorkbookRef, rangeName: RangeName, values: RangeValues): Promise<void> {
	await apiPatch("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/names/{range-name}/range", { ...workbookRef, rangeName }, calculateHeader(workbookRef), values);
}