import type { RangeValues } from "./RangeValues.js";

export default interface RangeResponse {
    address: string;         // The full address of the range (e.g., "Sheet1!A1:C3")
    addressLocal: string;    // The localized address of the range
    cellCount: number;       // Total number of cells in the range
    columnCount: number;     // Number of columns in the range
    columnHidden: boolean;   // Whether columns in the range are hidden
    columnIndex: number;     // The index of the first column in the range
    rowCount: number;        // Number of rows in the range
    rowHidden: boolean;      // Whether rows in the range are hidden
    rowIndex: number;        // The index of the first row in the range
    values: RangeValues;      // 2D array of cell values
}