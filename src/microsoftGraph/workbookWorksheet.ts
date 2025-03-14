/** GraphAPI Workbook Worksheet bindings. NO NOT ADD BUSINESS OR MANIPULATION LOGIC HERE! */

import { apiDelete, apiGet, apiPatch, apiPost } from "./api.js";
import type { WorkbookWorksheet } from "./models.js";
import { calculateApiHeader, type WorkbookRef } from "./workbook.js";

export type WorksheetId = string & { __brand: "WorksheetId" };
export type WorksheetName = string & { __brand: "WorksheetName" };
export type WorksheetRef = WorkbookRef & { worksheetId: WorksheetId };

export type ListWorksheetResponse = {
    value: WorkbookWorksheet[];
};

/** Retrieve a list of worksheets. @see https://learn.microsoft.com/en-us/graph/api/worksheet-list */
export async function listWorksheets(workbookRef: WorkbookRef): Promise<ListWorksheetResponse> {
    return await apiGet<ListWorksheetResponse>("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets", workbookRef, calculateApiHeader(workbookRef));
}

/** Create a new worksheet, optionally with a defined name. @see https://learn.microsoft.com/en-us/graph/api/worksheetcollection-add */
export async function createWorksheet(workbookRef: WorkbookRef, name?: string): Promise<WorkbookWorksheet> {
    return await apiPost<WorkbookWorksheet>("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/add", workbookRef, calculateApiHeader(workbookRef), { name });
}

/** Update the name, position and/or visibility of a worksheet. @see https://learn.microsoft.com/en-us/graph/api/worksheet-update */
export async function updateWorksheet(worksheetRef: WorksheetRef, updates: { name?: string; position?: number; visibility?: "Visible" | "Hidden" | "VeryHidden"; }): Promise<WorkbookWorksheet> {
    return await apiPatch<WorkbookWorksheet>("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}", worksheetRef, calculateApiHeader(worksheetRef), updates);
}

/** Permanently delete a worksheet. @see https://learn.microsoft.com/en-us/graph/api/worksheet-delete */
export async function deleteWorksheet(worksheetRef: WorksheetRef): Promise<void> {
    await apiDelete("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}", worksheetRef, calculateApiHeader(worksheetRef));
}
