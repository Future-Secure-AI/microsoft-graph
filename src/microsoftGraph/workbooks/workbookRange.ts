/** GraphAPI Workbook Range bindings. NO NOT ADD BUSINESS OR MANIPULATION LOGIC HERE! */

import { apiGet, apiPatch, apiPost } from "../api.js";
import type { WorkbookRange } from "../models.js";
import { calculateApiHeader, type WorkbookRef } from "./workbook.js";
import type { WorkbookWorksheetRef } from "./workbookWorksheet.js";

export type WorkbookRangeAddress = string & { __brand: "WorkbookRangeAddress" };
export type WorkbookRangeRef = WorkbookWorksheetRef & { address: WorkbookRangeAddress };

export type WorkbookRangeName = string & { __brand: "WorkbookRangeName" };
export type WorkbookNamedRangeRef = WorkbookRef & { rangeName: WorkbookRangeName };

/** Fetch a range, including values and formatting. @see https://learn.microsoft.com/en-us/graph/api/range-get */
export async function getRange(rangeRef: WorkbookRangeRef): Promise<WorkbookRange> {
    return await apiGet<WorkbookRange>(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='{address}')`, rangeRef, calculateApiHeader(rangeRef));
}

/** Update range, including values and formatting. Properties that aren't included in the request maintain their previous values or are recalculated based on changes to other property values. @see https://learn.microsoft.com/en-us/graph/api/range-update */
export async function updateRange(rangeRef: WorkbookRangeRef, update: WorkbookRange): Promise<void> {
    await apiPatch("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='{address}')", rangeRef, calculateApiHeader(rangeRef), update);
}

/** Clear a range - content, formatting or both. @see https://learn.microsoft.com/en-us/graph/api/range-delete */
export async function clearRange(rangeRef: WorkbookRangeRef, applyTo: "All" | "Formats" | "Contents" = "All"): Promise<void> {
    await apiPost("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='{address}')/clear", rangeRef, calculateApiHeader(rangeRef), { applyTo });
}

/** Delete a range. @see https://learn.microsoft.com/en-us/graph/api/range-clear */
export async function deleteRange(rangeRef: WorkbookRangeRef, shift: "Up" | "Left"): Promise<void> {
    await apiPost("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='{address}')/delete", rangeRef, calculateApiHeader(rangeRef), { shift });
}

/** Insert a new blank range at a specified address, shifting existing cells. Use `updateRange` after to set content. @see https://learn.microsoft.com/en-us/graph/api/range-insert */
export async function insertCells(worksheetRef: WorkbookWorksheetRef, address: string, shift: "Down" | "Right"): Promise<WorkbookRange> {
    return await apiPost<WorkbookRange>(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='${address}')/insert`, worksheetRef, calculateApiHeader(worksheetRef), { shift });
}

// NAMED RANGES

/** Retrieve range that has been defined using the "named range" functionality. @see https://learn.microsoft.com/en-us/graph/api/range-get */
export async function getNamedRange(rangeRef: WorkbookNamedRangeRef): Promise<WorkbookRange> {
    return await apiGet<WorkbookRange>("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/names/{range-name}/range", rangeRef, calculateApiHeader(rangeRef));
}

/** Update range that has been defined using the "named range" functionality. Properties that aren't included in the request maintain their previous values or are recalculated based on changes to other property values. @see https://learn.microsoft.com/en-us/graph/api/range-update */
export async function updateNamedRange(rangeRef: WorkbookNamedRangeRef, value: WorkbookRange): Promise<void> {
    await apiPatch("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/names/{range-name}/range", rangeRef, calculateApiHeader(rangeRef), value);
}

// USED RANGE

/** Retrieve the used range in a worksheet, ignoring trailing rows and columns that are blank. @see https://learn.microsoft.com/en-us/graph/api/range-usedrange */
export async function getUsedRange(worksheetRef: WorkbookWorksheetRef): Promise<WorkbookRange> {
    return await apiGet<WorkbookRange>("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range/usedRange", worksheetRef, calculateApiHeader(worksheetRef));
}
