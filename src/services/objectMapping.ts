/**
 * Automated conversion of rows to objects and vice versa based on defined mapping rules.
 * @module objectMapping
 * @category Services
 */

import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import type { Cell, CellValue } from "../models/Cell.ts";
import type { ColumnName, ColumnOffset } from "../models/Column.ts";
import { generalCellFormat } from "./cell.ts";

/**
 * Defines rules for mapping between spreadsheet rows and object properties.
 * @template T Object type to map to/from.
 */
export type ObjectMapping<T> = {
	[K in keyof T]-?: {
		/**
		 * Pattern to match a column heading for mapping to the object property.
		 * If a string is provided, it will be used as the column name.
		 */
		columnPattern: RegExp;

		/**
		 * Decodes a cell to an object property value.
		 * @param cell Cell to decode.
		 * @returns Decoded property value.
		 * @remarks If omitted, the cell's `value` (not `text`) will be used without conversion.
		 * @example
		 * (cell: Cell) => Number.parseFloat(cell.value.toString()) // Convert string number to number
		 */
		decode?: (cell: Cell) => T[K];

		/**
		 * Encodes an object property value to a cell.
		 * @param prop Property value to encode.
		 * @returns Encoded cell.
		 * @remarks If omitted, the cell will be created with the `value` property set to the property value.
		 * @example
		 * (prop: number) => ({ value: prop.toString(), ... }) // Convert number to string cell value
		 */
		encode?: (prop: T[K]) => Cell;
	};
};

/**
 * Resolved mapping from object properties to column offsets and encode/decode functions.
 * @template T Object type being mapped.
 */
export type ResolvedObjectMapping<T> = {
	[K in keyof T]-?: {
		columnOffset: ColumnOffset;
		decode: (cell: Cell) => T[K];
		encode: (prop: T[K]) => Cell;
	};
};

/**
 * Converts spreadsheet rows to objects using the first row as a header.
 * @template T The object type to yield.
 * @param rows Iterable or async iterable of cell arrays (rows).
 * @param rules Mapping rules for converting columns to object properties.
 * @yields Objects of type T, one for each data row.
 */
export async function* rowsToObjectsWithHeader<T>(rows: Iterable<Cell[]> | AsyncIterable<Cell[]>, rules: ObjectMapping<T>): AsyncIterable<T> {
	let mapping: ResolvedObjectMapping<T> | null = null;

	for await (const row of rows) {
		if (!mapping) {
			mapping = createObjectMapping<T>(row, rules);
			continue;
		}

		yield rowToObject<T>(row, mapping);
	}
}

/**
 * Creates a mapping from a header row to object properties based on provided rules.
 * @template T The object type being mapped.
 * @param headerRow The header row, used to determine column offsets.
 * @param rules The mapping rules for converting cells to object properties.
 * @returns The resolved mapping for use in row/object conversion.
 * @throws {InvalidArgumentError} If a column matching a pattern is not found in the header row.
 */
export function createObjectMapping<T>(headerRow: (ColumnName | Cell)[], rules: ObjectMapping<T>): ResolvedObjectMapping<T> {
	const headStrings = headerRow.map((c) => (typeof c === "object" ? c.text : c)) as string[];

	const resolved = {} as ResolvedObjectMapping<T>;
	for (const key in rules) {
		if (!Object.prototype.hasOwnProperty.call(rules, key)) {
			continue;
		}

		const rule = rules[key];
		const offset = headStrings.findIndex((h) => rule.columnPattern.test(h));
		if (offset === -1) {
			throw new InvalidArgumentError(`Column matching "${rule.columnPattern}" not found in header.`);
		}
		const columnOffset = offset as ColumnOffset;
		const defaultDecode = (cell: Cell) => cell.value as T[typeof key];
		const defaultEncode = (prop: T[typeof key]) =>
			({
				value: prop as CellValue,
				text: prop?.toString() ?? "",
				format: generalCellFormat,
				merge: {},
				alignment: {},
				borders: {},
				fill: {},
				font: {},
			}) satisfies Cell;
		const decode = rule.decode ?? defaultDecode;
		const encode = rule.encode ?? defaultEncode;

		resolved[key] = {
			columnOffset,
			decode,
			encode,
		};
	}

	return resolved;
}

/**
 * Converts spreadsheet rows to objects using a provided mapping.
 * @template T The object type to yield.
 * @param rows Iterable or async iterable of cell arrays (rows).
 * @param mapping The resolved mapping for row/object conversion.
 * @yields Objects of type T, one for each row.
 */
export async function* rowsToObjects<T>(rows: Iterable<Cell[]> | AsyncIterable<Cell[]>, mapping: ResolvedObjectMapping<T>): AsyncIterable<T> {
	for await (const row of rows) {
		yield rowToObject<T>(row, mapping);
	}
}

/**
 * Converts objects to spreadsheet rows using a provided mapping.
 * @template T The object type to convert.
 * @param objects Iterable or async iterable of objects.
 * @param mapping The resolved mapping for object/row conversion.
 * @yields Arrays of partial cells, one for each object.
 */
export async function* objectsToRows<T>(objects: Iterable<T> | AsyncIterable<T>, mapping: ResolvedObjectMapping<T>): AsyncIterable<Partial<Cell>[]> {
	for await (const obj of objects) {
		yield objectToRow<T>(obj, mapping);
	}
}

/**
 * Converts a row of cells to an object using the provided mapping.
 * @template T The object type to return.
 * @param cells The array of cells representing a row.
 * @param rules The resolved mapping for row/object conversion.
 * @returns The object of type T.
 * @throws {InvalidArgumentError} If a required column is missing in the row.
 */
export function rowToObject<T>(cells: Cell[], rules: ResolvedObjectMapping<T>) {
	const record = {} as T;

	for (const key in rules) {
		if (!Object.prototype.hasOwnProperty.call(rules, key)) {
			continue;
		}
		const rule = rules[key];
		const cell = cells[rule.columnOffset];
		if (!cell) {
			throw new InvalidArgumentError(`Column at index ${rule.columnOffset} is missing for key "${key}".`);
		}
		record[key as keyof T] = rule.decode(cell) as T[keyof T];
	}
	return record;
}

/**
 * Converts an object to a row of cells using the provided mapping.
 * @template T The object type to convert.
 * @param record The object to convert.
 * @param mapper The resolved mapping for object/row conversion.
 * @returns An array of partial cells representing the row.
 */
export function objectToRow<T>(record: T, mapper: ResolvedObjectMapping<T>): Partial<Cell>[] {
	const row: Partial<Cell>[] = [];
	for (const key in mapper) {
		if (!Object.prototype.hasOwnProperty.call(mapper, key)) {
			continue;
		}
		const { columnOffset, encode } = mapper[key];
		const prop = record[key as keyof T] as T[typeof key];
		row[columnOffset] = encode(prop);
	}
	return row;
}
