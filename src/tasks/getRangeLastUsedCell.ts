import ProtocolError from "../errors/ProtocolError.ts";
import type { WorkbookWorksheetRangeRef } from "../models/WorkbookWorksheetRangeRef.ts";
import getWorkbookWorksheetRange from "../operations/workbookWorksheet/getWorkbookWorksheetRange.ts";
import { indexesToAddress } from "../services/address.ts";

export default async function getRangeLastUsedCell(rangeRef: WorkbookWorksheetRangeRef): Promise<{ value: string | number | boolean | null, address: string, rowIndex: number, columnIndex: number } | null> {
    // TODO: Consider adding chunking if the range is too large

    const range = await getWorkbookWorksheetRange(rangeRef);

    const { rowCount, columnCount } = range;
    if (rowCount === undefined || columnCount === undefined) {
        throw new ProtocolError("Counts missing");
    }

    const values = range.values as (string | number | boolean | null)[][];
    if (values === undefined) {
        throw new ProtocolError("Range values missing");
    }

    for (let row = rowCount - 1; row >= 0; row--) {
        const currentRow = values[row];
        if (currentRow !== undefined) {
            for (let col = columnCount - 1; col >= 0; col--) {
                const cell = currentRow[col];
                if (cell !== null && cell !== undefined && cell !== "") {
                    const address = indexesToAddress(row, col);
                    return {
                        value: cell,
                        address,
                        rowIndex: row,
                        columnIndex: col
                    };
                }
            }
        }
    }

    return null;
}