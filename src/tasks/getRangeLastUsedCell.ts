import ProtocolError from "../errors/ProtocolError.ts";
import type { WorkbookWorksheetRangeRef } from "../models/WorkbookWorksheetRangeRef.ts";
import getWorkbookWorksheetRange from "../operations/workbookWorksheet/getWorkbookWorksheetRange.ts";
import { indexesToAddress as cellIndexesToAddress } from "../services/address.ts";

export default async function getRangeLastUsedCell(rangeRef: WorkbookWorksheetRangeRef): Promise<{ value: string | number | boolean | null, address: string, rowIndex: number, columnIndex: number } | null> {
    // TODO: Consider adding chunking if the range is too large
    // TODO: Reduce cells returned by using "used range"?

    const range = await getWorkbookWorksheetRange(rangeRef);

    const { rowCount, columnCount } = range;
    if (rowCount === undefined || columnCount === undefined) {
        throw new ProtocolError("Counts missing");
    }

    const values = range.values as (string | number | boolean | null)[][];
    if (values === undefined) {
        throw new ProtocolError("Range values missing");
    }

    for (let rowIndex = rowCount - 1; rowIndex >= 0; rowIndex--) {
        const row = values[rowIndex];
        if (row === undefined) {
            throw new ProtocolError("Row missing");
        }

        for (let columnIndex = columnCount - 1; columnIndex >= 0; columnIndex--) {
            const cell = row[columnIndex];
            if (cell === undefined) {
                throw new ProtocolError("Cell missing");
            }

            if (cell !== null && cell !== "") {
                const address = cellIndexesToAddress(rowIndex, columnIndex);
                return {
                    value: cell,
                    address,
                    rowIndex: rowIndex,
                    columnIndex: columnIndex
                };
            }

        }
    }

    return null;
}