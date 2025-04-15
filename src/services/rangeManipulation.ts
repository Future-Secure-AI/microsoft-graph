import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import type { Address } from "../models/Address.ts";
import type { CellRangeValues } from "../models/CellRangeValues.ts";
import type { CellValue } from "../models/CellValue.ts";
import type { ColumnOffset } from "../models/ColumnOffset.ts";
import type { RowOffset } from "../models/RowOffset.ts";
import { cartesianToAddress } from "./cartesianAddress.ts";

/**
 * Converts a 2D array of cell values into range address in the upper left.
 *
 * @param {CellRangeValues} values - A 2D array representing cell values.
 * @returns {Address} The default cell range address (e.g., "A1:C3").
 * @throws {InvalidArgumentError} If rows have inconsistent column counts.
 */
export function inferRangeAddress(values: CellRangeValues): Address {
	const first = values[0];

	if (!first) {
		return "A1";
	}

	for (const row of values) {
		if (row.length !== first.length) {
			throw new InvalidArgumentError("All rows must have the same number of columns");
		}
	}

	const rowCount = values.length;
	const columnCount = first.length;

	const startRow = 0 as RowOffset;
	const startColumn = 0 as ColumnOffset;

	const endRow = (rowCount - 1) as RowOffset;
	const endColumn = (columnCount - 1) as ColumnOffset;

	return cartesianToAddress({
		ax: startColumn,
		ay: startRow,
		bx: endColumn,
		by: endRow,
	});
}

/**
 * Converts a 2D array of cell values into an array of objects.
 * Assumes the first row is a header and uses it as keys for the objects.
 *
 * @param {CellRangeValues} values - A 2D array representing cell values.
 * @returns {unknown[]} An array of objects where each object represents a row.
 * @throws {InvalidArgumentError} If rows have inconsistent column counts or no header row is present.
 */
export function inferRangeObject(values: CellRangeValues): unknown[] {
	const [header, ...rows] = values;

	if (!header) {
		throw new InvalidArgumentError("Does not contain a header row");
	}

	return rows.map((row, index) => {
		if (row.length !== header.length) {
			throw new InvalidArgumentError(`Row ${index} length must match header length`);
		}

		return header.reduce(
			(obj, key, index) => {
				obj[key.toString()] = row[index];
				return obj;
			},
			{} as Record<string, unknown>,
		);
	});
}

/**
 * Converts an array of objects into a 2D array of cell values.
 * The first row of the 2D array contains the keys as headers.
 *
 * @param {unknown[]} objs - An array of objects to convert.
 * @returns {CellRangeValues} A 2D array where the first row is the header and subsequent rows are the object values.
 */
export function inferObjectRange(objs: unknown[]): CellRangeValues {
	if (objs.length === 0) {
		return [];
	}

	const header = Array.from(new Set(objs.flatMap((obj) => Object.keys(obj as Record<string, unknown>))));
	const rows = objs.map((obj) => header.map((key) => (obj as Record<string, unknown>)[key] as CellValue));

	return [header, ...rows];
}
