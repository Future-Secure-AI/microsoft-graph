import { get, patch } from "./graphApi.js";
import type { ItemReference } from "./sharepoint.js";

export type CellValue = string | number | boolean | null | Date;
export type RangeValues = CellValue[][];
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

export type WorksheetName = string & { __brand: "WorksheetName" };
export type RangeName = string & { __brand: "RangeName" };

export type RangeReference = ItemReference & { rangeName: RangeName };
export type WorksheetReference = ItemReference & { worksheetName: WorksheetName };

export const getNamedRangeValues = async (range: RangeReference): Promise<RangeResponse> =>
    get<RangeResponse>(["sites", range.siteId, "drives", range.driveId, "items", range.itemId, "workbook", "names", range.rangeName, "range"]);

export const setNamedRangeValues = async (range: RangeReference, values: RangeValues): Promise<void> =>
    patch(["sites", range.siteId, "drives", range.driveId, "items", range.itemId, "workbook", "names", range.rangeName, "range"], values);

export const getUsedRangeValues = async (worksheet: WorksheetReference): Promise<RangeResponse> =>
    get<RangeResponse>(["sites", worksheet.siteId, "drives", worksheet.driveId, "items", worksheet.itemId, "workbook", "names", worksheet.worksheetName, "range"]);

// TODO: ...