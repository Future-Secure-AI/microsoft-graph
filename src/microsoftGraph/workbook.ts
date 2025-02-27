import { deleteItem } from "./drive.js";
import { apiDelete, apiGet, apiPatch } from "./api.js";
import type { RangeRef, RangeValues, WorkbookRange, WorkbookRef, WorkbookWorksheet, WorksheetRef } from "./models.js";

export type ListWorksheetResponse = {
    value: WorkbookWorksheet[];
};

/**
 * Delete an workbook.
 * https://learn.microsoft.com/en-us/graph/api/driveitem-delete
 */
export const deleteWorkbook = async (ref: WorkbookRef): Promise<void> =>
    deleteItem(ref);

/**
 * Retrieve a list of worksheets in a given workbook.
 * https://learn.microsoft.com/en-us/graph/api/worksheet-list
 */
export const listWorksheets = async (ref: WorkbookRef): Promise<ListWorksheetResponse> =>
    apiGet<ListWorksheetResponse>("/sites/?/drives/?/items/?/workbook/worksheets", [ref.site, ref.drive, ref.item]);

/**
 * Delete worksheet from a workbook.
 * https://learn.microsoft.com/en-us/graph/api/worksheet-delete
 */
export const deleteWorksheet = async (ref: WorksheetRef): Promise<void> =>
    apiDelete("/sites/?/drives/?/items/?/workbook/worksheets/?", [ref.site, ref.drive, ref.item, ref.worksheet]);

/**
 * Retrieve the used range of the given worksheet.
 * https://learn.microsoft.com/en-us/graph/api/range-usedrange
 */
export const getUsedRangeValues = async (ref: WorksheetRef): Promise<WorkbookRange> =>
    apiGet<WorkbookRange>("/sites/?/drives/?/items/?/workbook/worksheets/?/range/usedRange", [ref.site, ref.drive, ref.item, ref.worksheet]);

/**
 * Retrieve a named range.
 * https://learn.microsoft.com/en-us/graph/api/range-get
 */
export const getNamedRangeValues = async (ref: RangeRef): Promise<WorkbookRange> =>
    apiGet<WorkbookRange>("/sites/?/drives/?/items/?/workbook/names/?/range", [ref.site, ref.drive, ref.item, ref.range]);

/**
 * Update a named range.
 * https://learn.microsoft.com/en-us/graph/api/range-update
 */
export const setNamedRangeValues = async (ref: RangeRef, values: RangeValues): Promise<void> =>
    apiPatch("/sites/?/drives/?/items/?/workbook/names/?/range", [ref.site, ref.drive, ref.item, ref.range], values);