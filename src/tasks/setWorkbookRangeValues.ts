/**
 * Sets the values of a specified workbook range.
 * @module setWorkbookRangeValues
 * @category Tasks
 * @hidden
 */

import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import type { CellValue } from "../models/Cell.ts";
import type { WorkbookRangeRef } from "../models/WorkbookRange.ts";
import updateWorkbookRange from "../operations/workbookRange/updateWorkbookRange.ts";
import { countAddressColumns, countAddressRows } from "../services/addressManipulation.ts";

/**
 * Sets the values of a specified workbook range.
 * @param {WorkbookRangeRef} rangeRef Reference to the workbook range to update.
 * @param {CellRangeValues} values - The values to set in the specified workbook range. Must match the range's dimensions.
 * @deprecated Use `writeWorkbookRows` instead.
 * @hidden
 */
export default async function setWorkbookRangeValues(rangeRef: WorkbookRangeRef, values: CellValue[][]) {
	const rowCount = countAddressRows(rangeRef.address);
	if (values.length !== rowCount) {
		throw new InvalidArgumentError(`The number of rows in the values array (${values.length}) does not match the number of rows in the range (${rowCount}).`);
	}

	const columnCount = countAddressColumns(rangeRef.address);
	if (values.some((row) => row.length !== columnCount)) {
		throw new InvalidArgumentError(`The number of columns in the values array does not match the number of columns in the range (${columnCount}).`);
	}

	await updateWorkbookRange(rangeRef, {
		values: values,
	});
}
