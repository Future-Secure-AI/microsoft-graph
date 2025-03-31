import { describe, expect, it } from "vitest";
import { columnToIndex, indexesToCell, indexToColumn, indexToRow, rowToIndex } from "./address.ts";

describe("indexesToAddress", () => {
	it("should convert row and column indexes to an address", () => {
		expect(indexesToCell(0, 0)).toBe("A1");
		expect(indexesToCell(4, 2)).toBe("C5");
		expect(indexesToCell(10, 25)).toBe("Z11");
	});
});

describe("columnToIndex", () => {
	it("should convert column letters to a zero-based index", () => {
		expect(columnToIndex("A")).toBe(0);
		expect(columnToIndex("Z")).toBe(25);
		expect(columnToIndex("AA")).toBe(26);
		expect(columnToIndex("AB")).toBe(27);
		expect(columnToIndex("ZZ")).toBe(701);
	});
});

describe("indexToColumn", () => {
	it("should convert a zero-based index to column letters", () => {
		expect(indexToColumn(0)).toBe("A");
		expect(indexToColumn(25)).toBe("Z");
		expect(indexToColumn(26)).toBe("AA");
		expect(indexToColumn(27)).toBe("AB");
		expect(indexToColumn(701)).toBe("ZZ");
	});
});

describe("rowToIndex", () => {
	it("should convert a 1-based row to a 0-based index", () => {
		expect(rowToIndex(1)).toBe(0);
		expect(rowToIndex(5)).toBe(4);
		expect(rowToIndex(100)).toBe(99);
	});
});

describe("indexToRow", () => {
	it("should convert a 0-based index to a 1-based row", () => {
		expect(indexToRow(0)).toBe(1);
		expect(indexToRow(4)).toBe(5);
		expect(indexToRow(99)).toBe(100);
	});
});
