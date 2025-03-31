import { describe, expect, it } from "vitest";
import type { Cell } from "../models/Cell.ts";
import type { Column } from "../models/Column.ts";
import type { ColumnIndex } from "../models/ColumnIndex.ts";
import type { Row } from "../models/Row.ts";
import type { RowIndex } from "../models/RowIndex.ts";
import { columnToIndex, indexesToCell, indexToColumn, indexToRow, rowToIndex } from "./address.ts";

describe("indexesToAddress", () => {
	it("should convert row and column indexes to an address", () => {
		expect(indexesToCell(0 as RowIndex, 0 as ColumnIndex)).toBe("A1" as Cell);
		expect(indexesToCell(4 as RowIndex, 2 as ColumnIndex)).toBe("C5" as Cell);
		expect(indexesToCell(10 as RowIndex, 25 as ColumnIndex)).toBe("Z11" as Cell);
	});
});

describe("columnToIndex", () => {
	it("should convert column letters to a zero-based index", () => {
		expect(columnToIndex("A" as Column)).toBe(0 as ColumnIndex);
		expect(columnToIndex("Z" as Column)).toBe(25 as ColumnIndex);
		expect(columnToIndex("AA" as Column)).toBe(26 as ColumnIndex);
		expect(columnToIndex("AB" as Column)).toBe(27 as ColumnIndex);
		expect(columnToIndex("ZZ" as Column)).toBe(701 as ColumnIndex);
	});
});

describe("indexToColumn", () => {
	it("should convert a zero-based index to column letters", () => {
		expect(indexToColumn(0 as ColumnIndex)).toBe("A" as Column);
		expect(indexToColumn(25 as ColumnIndex)).toBe("Z" as Column);
		expect(indexToColumn(26 as ColumnIndex)).toBe("AA" as Column);
		expect(indexToColumn(27 as ColumnIndex)).toBe("AB" as Column);
		expect(indexToColumn(701 as ColumnIndex)).toBe("ZZ" as Column);
	});
});

describe("rowToIndex", () => {
	it("should convert a 1-based row to a 0-based index", () => {
		expect(rowToIndex("1" as Row)).toBe(0 as RowIndex);
		expect(rowToIndex("5" as Row)).toBe(4 as RowIndex);
		expect(rowToIndex("100" as Row)).toBe(99 as RowIndex);
	});
});

describe("indexToRow", () => {
	it("should convert a 0-based index to a 1-based row", () => {
		expect(indexToRow(0 as RowIndex)).toBe("1" as Row);
		expect(indexToRow(4 as RowIndex)).toBe("5" as Row);
		expect(indexToRow(99 as RowIndex)).toBe("100" as Row);
	});
});
