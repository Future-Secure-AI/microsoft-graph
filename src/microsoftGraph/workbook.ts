import { apiDelete, apiGet, apiPatch, apiPost, apiPut } from "./api.js";
import { deleteItem, type DriveRef, type ItemPath, type ItemRef } from "./drive.js";
import InvalidArgumentError from "./InvalidArgumentError.js";
import type { DriveItem, WorkbookRange, WorkbookWorksheet } from "./models.d.ts";

export type WorkbookSessionId = string & { __brand: "WorkbookSessionId" };
export type WorkbookRef = ItemRef & { sessionId?: WorkbookSessionId }

export type WorksheetId = string & { __brand: "WorksheetId" };
export type WorksheetName = string & { __brand: "WorksheetName" };
export type WorksheetRef = WorkbookRef & { worksheetId: WorksheetId };

export type RangeAddress = string & { __brand: "RangeAddress" };
export type AddressedRangeRef = WorksheetRef & { address: RangeAddress };

export type RangeName = string & { __brand: "RangeName" };
export type NamedRangeRef = WorkbookRef & { rangeName: RangeName };

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

// CREATE/DELETE

/** Create a new blank workbook. */
export async function createWorkbook(driveRef: DriveRef, itemPath: ItemPath): Promise<DriveItem> {
	return await apiPut<DriveItem>(`/sites/{site-id}/drives/{drive-id}/root:${itemPath}:/content`, driveRef, [], Buffer.from([])); // NOTE: This appears not to be documented in Microsoft Learn. 
}

/** Delete a workbook. @see https://learn.microsoft.com/en-us/graph/api/driveitem-delete */
export async function deleteWorkbook(workbookRef: WorkbookRef): Promise<void> {
	await deleteItem(workbookRef);
}

// SESSIONS

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

// WORKSHEETS

/** Retrieve a list of worksheets. @see https://learn.microsoft.com/en-us/graph/api/worksheet-list */
export async function listWorksheets(workbookRef: WorkbookRef): Promise<ListWorksheetResponse> {
	return await apiGet<ListWorksheetResponse>("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets", workbookRef, calculateHeader(workbookRef));
}

/** Create a new worksheet, optionally with a defined name. @see https://learn.microsoft.com/en-us/graph/api/worksheetcollection-add */
export async function createWorksheet(workbookRef: WorkbookRef, name?: string): Promise<WorkbookWorksheet> {
	return await apiPost<WorkbookWorksheet>("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/add", workbookRef, calculateHeader(workbookRef), { name });
}

/** Update the name, position and/or visibility of a worksheet. @see https://learn.microsoft.com/en-us/graph/api/worksheet-update */
export async function updateWorksheet(worksheetRef: WorksheetRef, updates: { name?: string; position?: number; visibility?: "Visible" | "Hidden" | "VeryHidden" }): Promise<WorkbookWorksheet> {
	return await apiPatch<WorkbookWorksheet>("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}", worksheetRef, calculateHeader(worksheetRef), updates);
}

/** Permanently delete a worksheet. @see https://learn.microsoft.com/en-us/graph/api/worksheet-delete */
export async function deleteWorksheet(worksheetRef: WorksheetRef): Promise<void> {
	await apiDelete("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}", worksheetRef, calculateHeader(worksheetRef));
}

// ADDRESSED RANGES

/** Fetch a range, including values and formatting. @see https://learn.microsoft.com/en-us/graph/api/range-get */
export async function getRange(rangeRef: AddressedRangeRef): Promise<WorkbookRange> {
	return await apiGet<WorkbookRange>(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='{address}')`, rangeRef, calculateHeader(rangeRef));
}

/** Update range, including values and formatting. Properties that aren't included in the request maintain their previous values or are recalculated based on changes to other property values. @see https://learn.microsoft.com/en-us/graph/api/range-update */
export async function updateRange(rangeRef: AddressedRangeRef, update: WorkbookRange): Promise<void> {
	await apiPatch("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='{address}')", rangeRef, calculateHeader(rangeRef), update);
}

/** Clear a range - content, formatting or both. @see https://learn.microsoft.com/en-us/graph/api/range-delete */
export async function clearRange(rangeRef: AddressedRangeRef, applyTo: "All" | "Formats" | "Contents" = "All"): Promise<void> {
	"/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}"
	await apiPost("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='{address}')/clear", rangeRef, calculateHeader(rangeRef), { applyTo });
}

/** Delete a range. @see https://learn.microsoft.com/en-us/graph/api/range-clear */
export async function deleteRange(rangeRef: AddressedRangeRef, shift: "Up" | "Left"): Promise<void> {
	await apiPost("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='{address}')/delete", rangeRef, calculateHeader(rangeRef), { shift });
}

/** Insert a new blank range at a specified address, shifting existing cells. Use `updateRange` after to set content. @see https://learn.microsoft.com/en-us/graph/api/range-insert */
export async function insertCells(worksheetRef: WorksheetRef, address: string, shift: "Down" | "Right"): Promise<WorkbookRange> {
	return await apiPost<WorkbookRange>(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='${address}')/insert`, worksheetRef, calculateHeader(worksheetRef), { shift });
}

// NAMED RANGES

/** Retrieve range that has been defined using the "named range" functionality. @see https://learn.microsoft.com/en-us/graph/api/range-get */
export async function getNamedRange(rangeRef: NamedRangeRef): Promise<WorkbookRange> {
	return await apiGet<WorkbookRange>("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/names/{range-name}/range", rangeRef, calculateHeader(rangeRef));
}

/** Update range that has been defined using the "named range" functionality. Properties that aren't included in the request maintain their previous values or are recalculated based on changes to other property values. @see https://learn.microsoft.com/en-us/graph/api/range-update */
export async function updateNamedRange(rangeRef: NamedRangeRef, value: WorkbookRange): Promise<void> {
	await apiPatch("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/names/{range-name}/range", rangeRef, calculateHeader(rangeRef), value);
}

// USED RANGE

/** Retrieve the used range in a worksheet, ignoring trailing rows and columns that are blank. @see https://learn.microsoft.com/en-us/graph/api/range-usedrange */
export async function getUsedRange(worksheetRef: WorksheetRef): Promise<WorkbookRange> {
	return await apiGet<WorkbookRange>("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range/usedRange", worksheetRef, calculateHeader(worksheetRef));
}
