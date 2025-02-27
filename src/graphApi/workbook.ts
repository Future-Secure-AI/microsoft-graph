import { deleteItem, type ItemReference } from "./drive.js";
import { apiDelete, apiGet, apiPatch } from "./api.js";

export type WorkbookReference = ItemReference;

export type WorksheetId = string & { __brand: "WorksheetId" };
export type WorksheetName = string & { __brand: "WorksheetName" };
export type WorksheetReference = WorkbookReference & { worksheet: WorksheetId | WorksheetName };

export type RangeId = string & { __brand: "RangeId" };
export type RangeName = string & { __brand: "RangeName" };
export type RangeReference = WorkbookReference & { range: RangeId | RangeName };

export type CellValue = string | number | boolean | null | Date;

export type RangeValues = CellValue[][];

export type WorksheetDefinition = {
    id: WorksheetId;
    name: WorksheetName;
    position: number;
    visibility: string;
};


export type RangeResponse = {
    address: string;
    addressLocal: string;
    cellCount: number;
    columnCount: number;
    columnHidden: boolean;
    columnIndex: number;
    rowCount: number;
    rowHidden: boolean;
    rowIndex: number;
    values: RangeValues;
}

export type ListWorksheetResponse = {
    value: WorksheetDefinition[];
};

// TODO: Flesh out models

export const deleteWorkbook = async (ref: WorkbookReference): Promise<void> =>
    deleteItem(ref);

/**
 * Retrieve a list of worksheets in a given workbook.
 * https://learn.microsoft.com/en-us/graph/api/worksheet-list
 */
export const listWorksheets = async (ref: WorkbookReference): Promise<ListWorksheetResponse> =>
    apiGet<ListWorksheetResponse>([
        "sites", ref.site,
        "drives", ref.drive,
        "items", ref.item,
        "workbook",
        "worksheets"
    ]);

/**
 * Delete worksheet from a workbook.
 * https://learn.microsoft.com/en-us/graph/api/worksheet-delete
 */
export const deleteWorksheet = async (ref: WorksheetReference): Promise<void> =>
    apiDelete([
        "sites", ref.site,
        "drives", ref.drive,
        "items", ref.item,
        "workbook",
        "worksheets", ref.worksheet
    ]);

/**
 * Retrieve the used range of the given worksheet.
 * https://learn.microsoft.com/en-us/graph/api/range-usedrange
 */
export const getUsedRangeValues = async (ref: WorksheetReference): Promise<RangeResponse> =>
    apiGet<RangeResponse>([
        "sites", ref.site,
        "drives", ref.drive,
        "items", ref.item,
        "workbook",
        "worksheets", ref.worksheet,
        "range", "usedRange"
    ]);

/**
 * Retrieve a named range.
 * https://learn.microsoft.com/en-us/graph/api/range-get
 */
export const getNamedRangeValues = async (ref: RangeReference): Promise<RangeResponse> =>
    apiGet<RangeResponse>([
        "sites", ref.site,
        "drives", ref.drive,
        "items", ref.item,
        "workbook",
        "names", ref.range,
        "range"
    ]);

/**
 * Update a named range.
 * https://learn.microsoft.com/en-us/graph/api/range-update
 */
export const setNamedRangeValues = async (ref: RangeReference, values: RangeValues): Promise<void> =>
    apiPatch([
        "sites", ref.site,
        "drives", ref.drive,
        "items", ref.item,
        "workbook",
        "names", ref.range,
        "range"
    ], values);
