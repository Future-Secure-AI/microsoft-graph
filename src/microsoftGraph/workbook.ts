import { apiDelete, apiGet, apiPatch, apiPost, apiPut } from "./api.js";
import { deleteItem, type DriveRef, type ItemPath, type ItemRef } from "./drive.js";
import type { DriveItem, WorkbookRange, WorkbookWorksheet } from "./models.d.ts";

export type WorkbookRef = ItemRef;

export type WorksheetId = string & { __brand: "WorksheetId" };
export type WorksheetName = string & { __brand: "WorksheetName" };
export type WorksheetRef = WorkbookRef & {
	worksheet: WorksheetId | WorksheetName;
};

export type RangeId = string & { __brand: "RangeId" };
export type RangeName = string & { __brand: "RangeName" };
export type RangeRef = WorkbookRef & { range: RangeId | RangeName };

export type CellValue = string | number | boolean | null | Date;
export type RangeValues = CellValue[][];

export type ListWorksheetResponse = {
	value: WorkbookWorksheet[];
};
/**
 * Create a new workbook in a drive.
 * NOTE: This appears not to be documented in Microsoft Learn.
 */
export async function createWorkbook(driveRef: DriveRef, itemPath: ItemPath): Promise<DriveItem> {
	return await apiPut<DriveItem>(`/sites/?/drives/?/root:${itemPath}:/content`, [driveRef.site, driveRef.drive], Buffer.from([]));
}

/**
 * Delete a workbook.
 * https://learn.microsoft.com/en-us/graph/api/driveitem-delete
 */
export async function deleteWorkbook(workbookRef: WorkbookRef): Promise<void> {
	await deleteItem(workbookRef);
}

/**
 * Retrieve a list of worksheets in a given workbook.
 * https://learn.microsoft.com/en-us/graph/api/worksheet-list
 */
export async function listWorksheets(workbookRef: WorkbookRef): Promise<ListWorksheetResponse> {
	return await apiGet<ListWorksheetResponse>("/sites/?/drives/?/items/?/workbook/worksheets", [workbookRef.site, workbookRef.drive, workbookRef.item]);
}

/**
 * Create a new worksheet in a given workbook.
 * https://learn.microsoft.com/en-us/graph/api/worksheetcollection-add
 */
export async function createWorksheet(workbookRef: WorkbookRef, name: string): Promise<WorkbookWorksheet> {
	return await apiPost<WorkbookWorksheet>("/sites/?/drives/?/items/?/workbook/worksheets/add", [workbookRef.site, workbookRef.drive, workbookRef.item], { name });
}

/**
 * Update the properties of a worksheet object.
 * https://learn.microsoft.com/en-us/graph/api/worksheet-update
 */
export async function updateWorksheet(ref: WorksheetRef, updates: { name?: string; position?: number; visibility?: "Visible" | "Hidden" | "VeryHidden" }): Promise<WorkbookWorksheet> {
	return await apiPatch<WorkbookWorksheet>("/sites/?/drives/?/items/?/workbook/worksheets/?", [ref.site, ref.drive, ref.item, ref.worksheet], updates);
}

/**
 * Delete a worksheet from a workbook.
 * https://learn.microsoft.com/en-us/graph/api/worksheet-delete
 */
export async function deleteWorksheet(workbookRef: WorksheetRef): Promise<void> {
	await apiDelete("/sites/?/drives/?/items/?/workbook/worksheets/?", [workbookRef.site, workbookRef.drive, workbookRef.item, workbookRef.worksheet]);
}

/**
 * Retrieve the used range of the given worksheet.
 * https://learn.microsoft.com/en-us/graph/api/range-usedrange
 */
export async function getUsedRangeValues(workbookRef: WorksheetRef): Promise<WorkbookRange> {
	return await apiGet<WorkbookRange>("/sites/?/drives/?/items/?/workbook/worksheets/?/range/usedRange", [workbookRef.site, workbookRef.drive, workbookRef.item, workbookRef.worksheet]);
}

/**
 * Retrieve a named range.
 * https://learn.microsoft.com/en-us/graph/api/range-get
 */
export async function getNamedRangeValues(rangeRef: RangeRef): Promise<WorkbookRange> {
	return await apiGet<WorkbookRange>("/sites/?/drives/?/items/?/workbook/names/?/range", [rangeRef.site, rangeRef.drive, rangeRef.item, rangeRef.range]);
}

/**
 * Update a named range.
 * https://learn.microsoft.com/en-us/graph/api/range-update
 */
export async function setNamedRangeValues(rangeRef: RangeRef, values: RangeValues): Promise<void> {
	await apiPatch("/sites/?/drives/?/items/?/workbook/names/?/range", [rangeRef.site, rangeRef.drive, rangeRef.item, rangeRef.range], values);
}