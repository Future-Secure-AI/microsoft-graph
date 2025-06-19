import { describe, expect, it } from "vitest";
import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import type { Cell, CellValue } from "../models/Cell.ts";
import { generalCellFormat } from "./cell.ts";
import { iterateToArray } from "./iteration.ts";
import { createObjectMapping, objectsToRows, rowsToObjects, rowsToObjectsWithHeader } from "./objectMapping.ts";

const namePattern = /^Name$/;
const agePattern = /^Age$/;
const valuePattern = /^Value$/;
const missingPattern = /^Missing$/;
const aPattern = /^A$/;
const bPattern = /^B$/;
const xPattern = /^X$/;
const yPattern = /^Y$/;

const cell = (value: CellValue, text?: string): Cell => ({
	value,
	text: text ?? String(value),
	format: generalCellFormat,
	merge: {},
	alignment: {},
	borders: {},
	fill: {},
	font: {},
});

describe("iterateRowsToObjectsWithHeader", () => {
	it("maps rows to objects using header row", async () => {
		const rows = [
			[cell("Name"), cell("Age")],
			[cell("Alice"), cell(30)],
			[cell("Bob"), cell(25)],
		];
		const rules = {
			name: { columnPattern: namePattern },
			age: { columnPattern: agePattern },
		};
		const objs = await iterateToArray(rowsToObjectsWithHeader(rows, rules));
		expect(objs).toEqual([
			{ name: "Alice", age: 30 },
			{ name: "Bob", age: 25 },
		]);
	});

	it("supports custom decode", async () => {
		const rows = [[cell("Value")], [cell("42")]];
		const rules = {
			value: {
				columnPattern: valuePattern,
				decode: (cell) => Number(cell.value),
			},
		};
		const result = await iterateToArray(rowsToObjectsWithHeader(rows, rules));
		expect(result[0].value).toBe(42);
	});
});

describe("iterateObjectsToRows", () => {
	it("supports custom encode", async () => {
		const header = [cell("Value")];
		const rules = {
			value: {
				columnPattern: valuePattern,
				encode: (prop) => cell(String(prop)),
			},
		};
		const mapping = createObjectMapping(header, rules);
		const encodedRows = await iterateToArray(objectsToRows([{ value: 42 }], mapping));
		expect(encodedRows[0][0].value).toBe("42");
	});

	it("objectToRow puts values in correct column offsets", async () => {
		const header = [cell("X"), cell("Y")];
		const rules = {
			y: { columnPattern: yPattern },
			x: { columnPattern: xPattern },
		};
		const mapping = createObjectMapping(header, rules);
		const rowsResult = await iterateToArray(objectsToRows([{ x: 1, y: 2 }], mapping));
		expect(rowsResult[0][mapping.x.columnOffset].value).toBe(1);
		expect(rowsResult[0][mapping.y.columnOffset].value).toBe(2);
	});
});

describe("createMapping", () => {
	it("throws if column is missing in header", () => {
		const header = [cell("A")];
		const rules = { foo: { columnPattern: missingPattern } };
		expect(() => createObjectMapping(header, rules)).toThrow(InvalidArgumentError);
	});
});

describe("iterateRowsToObjects", () => {
	it("throws if row is missing a cell for a mapped property", async () => {
		const header = [cell("A"), cell("B")];
		const rules = {
			a: { columnPattern: aPattern },
			b: { columnPattern: bPattern },
		};
		const mapping = createObjectMapping(header, rules);
		async function* gen() {
			await Promise.resolve();
			yield [cell("onlyA")];
		}
		let error: unknown;
		try {
			await iterateToArray(rowsToObjects(gen(), mapping));
		} catch (e) {
			error = e;
		}
		expect(error).toBeInstanceOf(InvalidArgumentError);
	});
});
