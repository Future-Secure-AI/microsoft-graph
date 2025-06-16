/**
 * Automated conversion of rows to objects and vice versa based on defined mapping rules.
 * @module objectMapping
 * @category Services
 */

import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import type { Cell, CellValue } from "../models/Cell.ts";
import type { ColumnName, ColumnOffset } from "../models/Column.ts";
import { generalCellFormat } from "./cell.ts";

/** Set of rules that define how to convert a row to an object */
export type MappingRules<T> = {
	[K in keyof T]-?: {
		/**
		 * Pattern to match a column heading that will be used to map to the object property.
		 * @remarks If a string is provided, it will be used as the column name.
		 */
		columnPattern: RegExp;

		/**
		 * Convert cell to object property.
		 * @param cell Cell to decode.
		 * @returns Decoded property value
		 * @remarks If omitted, the cell `value` (not the cell `text`) will be used without any conversion.
		 * @example
		 * (cell: Cell) => Number.parseFloat(cell.value.ToString()) // Convert string number to number
		 */
		decode?: (cell: Cell) => T[K];

		/**
		 * Convert object property to a cell.
		 * @param prop Property to encode.
		 * @returns Cell
		 * @remarks If omitted, the cell will be created with the `value` property set to the property value.
		 * @example
		 * (prop: number) => ({ value: prop.ToString(), ... }) // Convert number to string cell value
		 */
		encode?: (prop: T[K]) => Cell;
	};
};

type Mapping<T> = {
	[K in keyof T]-?: {
		columnOffset: ColumnOffset;
		decode: (cell: Cell) => T[K];
		encode: (prop: T[K]) => Cell;
	};
};

/**
 * Convert rows to objects based on the first row as a header.
 * @param rows
 * @param rules
 */
export async function* iterateRowsToObjectsWithHeader<T>(rows: Iterable<Cell[]> | AsyncIterable<Cell[]>, rules: MappingRules<T>): AsyncIterable<T> {
	let mapping: Mapping<T> | null = null;

	for await (const row of rows) {
		if (!mapping) {
			mapping = createMapping<T>(row, rules);
			continue;
		}

		yield rowToObject<T>(row, mapping);
	}
}

/**
 * Create a mapping from header row to object properties based on the provided rules.
 * @param headerRow Heading row, used to determine the column offsets for the mapping.
 * @param rules The mapping rules that define how to convert cells to object properties.
 * @returns Mappings that can be used to convert rows to objects and vice versa.
 * @throws {@link InvalidArgumentError} If a column matching the pattern is not found in the header row.
 */
export function createMapping<T>(headerRow: (ColumnName | Cell)[], rules: MappingRules<T>): Mapping<T> {
	const headStrings = headerRow.map((c) => (typeof c === "object" ? c.text : c)) as string[];

	const resolved = {} as Mapping<T>;
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
 * Convert rows to objects based on the provided mappings.
 * @param rows
 * @param mapping
 */
export async function* iterateRowsToObjects<T>(rows: Iterable<Cell[]> | AsyncIterable<Cell[]>, mapping: Mapping<T>): AsyncIterable<T> {
	for await (const row of rows) {
		yield rowToObject<T>(row, mapping);
	}
}

/**
 * Convert objects to rows based on the provided mappings.
 * @param objects
 * @param mapping
 */
export async function* iterateObjectsToRows<T>(objects: Iterable<T> | AsyncIterable<T>, mapping: Mapping<T>): AsyncIterable<Partial<Cell>[]> {
	for await (const obj of objects) {
		yield objectToRow<T>(obj, mapping);
	}
}

function rowToObject<T>(cells: Cell[], rules: Mapping<T>) {
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

function objectToRow<T>(record: T, mapper: Mapping<T>): Partial<Cell>[] {
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
