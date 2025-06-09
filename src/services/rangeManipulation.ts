import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import type { Address } from "../models/Address.ts";
import type { CellValue } from "../models/CellValue.ts";
import type { ColumnOffset } from "../models/ColumnOffset.ts";
import type { RowOffset } from "../models/RowOffset.ts";
import { cartesianToAddress } from "./cartesianAddress.ts";

/**
 * Converts a 2D array of cell values into range address in the upper left.
 *
 * @param {CellValue[][]} values - A 2D array representing cell values.
 * @param {RowOffset} [rowOffset=0] - The row offset to apply to the range address.
 * @param {ColumnOffset} [columnOffset=0] - The column offset to apply to the range address.
 * @returns {Address} The default cell range address (e.g., "A1:C3").
 * @throws {InvalidArgumentError} If rows have inconsistent column counts.
 */
export function inferRangeAddress(values: CellValue[][], rowOffset: RowOffset = 0 as RowOffset, columnOffset: ColumnOffset = 0 as ColumnOffset): Address {
	const first = values[0];

	if (!first || first.length === 0) {
		return cartesianToAddress({
			ax: columnOffset,
			bx: columnOffset,
			ay: rowOffset,
			by: rowOffset,
		});
	}

	for (const row of values) {
		if (row.length !== first.length) {
			throw new InvalidArgumentError("All rows must have the same number of columns");
		}
	}

	const rowCount = values.length;
	const columnCount = first.length;

	const endRow = (rowOffset + rowCount - 1) as RowOffset;
	const endColumn = (columnOffset + columnCount - 1) as ColumnOffset;

	return cartesianToAddress({
		ax: columnOffset,
		bx: endColumn,
		ay: rowOffset,
		by: endRow,
	});
}

/**
 * Converts a 2D array of cell values into a row address in the upper left.
 *
 * @param {CellValue[]} row - A single row of cell values.
 * @param {RowOffset} [rowOffset=0] - The row offset to apply to the address.
 * @param {ColumnOffset} [columnOffset=0] - The column offset to apply to the address.
 * @returns {Address} The default cell range address for the row (e.g., "A1").
 */
export function inferRowAddress(row: CellValue[], rowOffset: RowOffset = 0 as RowOffset, columnOffset: ColumnOffset = 0 as ColumnOffset): Address {
	if (row.length === 0) {
		return cartesianToAddress({
			ax: columnOffset,
			bx: columnOffset,
			ay: rowOffset,
			by: rowOffset,
		});
	}

	const endColumn = (columnOffset + row.length - 1) as ColumnOffset;
	return cartesianToAddress({
		ax: columnOffset,
		bx: endColumn,
		ay: rowOffset,
		by: rowOffset,
	});
}

/**
 * Converts a 2D array of cell values into an array of objects.
 * Assumes the first row is a header and uses it as keys for the objects.
 *
 * @param {CellValue[][]} values - A 2D array representing cell values.
 * @returns {unknown[]} Array of objects where each object represents a row.
 * @throws {InvalidArgumentError} If rows have inconsistent column counts or no header row is present.
 */
export function inferRangeObject(values: CellValue[][]): unknown[] {
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
 * @param {unknown[]} objs - Array of objects to convert.
 * @param {string[] | null} header - Optional header row. If not provided, it will be inferred from the object keys.
 * @returns {CellValue[][]} A 2D array where the first row is the header and subsequent rows are the object values.
 */
export function inferObjectRange(objs: unknown[], header: string[] | null = null): CellValue[][] {
	if (objs.length === 0) {
		return [];
	}

	const usedHeader = header ?? Array.from(new Set(objs.flatMap((obj) => Object.keys(obj as Record<string, unknown>))));
	const rows = objs.map((obj) => usedHeader.map((key) => (obj as Record<string, unknown>)[key] as CellValue));

	return [usedHeader, ...rows];
}
