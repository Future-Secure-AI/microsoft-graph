import type { RowRangeValues } from "../models/RowRangeValues.ts";
import type { WorkbookRangeRef } from "../models/WorkbookRangeRef.ts";
import getWorkbookWorksheetRange from "../operations/workbookRange/getWorkbookWorksheetRange.ts";

export default async function* iterateWorkbookRangeValues(rangeRef: WorkbookRangeRef): AsyncIterable<RowRangeValues> {
	const range = await getWorkbookWorksheetRange(rangeRef);

    for (const row of range.values) {
        yield row as RowRangeValues;
    }
}
