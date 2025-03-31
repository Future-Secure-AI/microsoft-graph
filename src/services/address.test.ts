import { describe, expect, it } from "vitest";
import type { BoxRangeAddress, CellAddress, ColumnAddress, RowAddress } from "../models/Address.ts";
import type { ColumnIndex } from "../models/ColumnIndex.ts";
import type { RowIndex } from "../models/RowIndex.ts";
import { cellAddressToIndexes, columnAddressToIndex, getBoxRangeFirstCell, getBoxRangeLastCell, indexesToCellAddress, indexToColumnAddress, indexToRowAddress, rowAddressToIndex } from "./address.ts";

describe("indexesToCellAddress", () => {
	it("should convert row and column indexes to an address", () => {
		expect(indexesToCellAddress(0 as RowIndex, 0 as ColumnIndex)).toBe("A1" as CellAddress);
		expect(indexesToCellAddress(4 as RowIndex, 2 as ColumnIndex)).toBe("C5" as CellAddress);
		expect(indexesToCellAddress(10 as RowIndex, 25 as ColumnIndex)).toBe("Z11" as CellAddress);
	});
});

describe("columnAddressToIndex", () => {
	it("should convert column letters to a zero-based index", () => {
		expect(columnAddressToIndex("A" as ColumnAddress)).toBe(0 as ColumnIndex);
		expect(columnAddressToIndex("Z" as ColumnAddress)).toBe(25 as ColumnIndex);
		expect(columnAddressToIndex("AA" as ColumnAddress)).toBe(26 as ColumnIndex);
		expect(columnAddressToIndex("AB" as ColumnAddress)).toBe(27 as ColumnIndex);
		expect(columnAddressToIndex("ZZ" as ColumnAddress)).toBe(701 as ColumnIndex);
	});
});

describe("indexToColumnAddress", () => {
	it("should convert a zero-based index to column letters", () => {
		expect(indexToColumnAddress(0 as ColumnIndex)).toBe("A" as ColumnAddress);
		expect(indexToColumnAddress(25 as ColumnIndex)).toBe("Z" as ColumnAddress);
		expect(indexToColumnAddress(26 as ColumnIndex)).toBe("AA" as ColumnAddress);
		expect(indexToColumnAddress(27 as ColumnIndex)).toBe("AB" as ColumnAddress);
		expect(indexToColumnAddress(701 as ColumnIndex)).toBe("ZZ" as ColumnAddress);
	});
});

describe("rowAddressToIndex", () => {
	it("should convert a 1-based row to a 0-based index", () => {
		expect(rowAddressToIndex("1" as RowAddress)).toBe(0 as RowIndex);
		expect(rowAddressToIndex("5" as RowAddress)).toBe(4 as RowIndex);
		expect(rowAddressToIndex("100" as RowAddress)).toBe(99 as RowIndex);
	});
});

describe("indexToRowAddress", () => {
	it("should convert a 0-based index to a 1-based row", () => {
		expect(indexToRowAddress(0 as RowIndex)).toBe("1" as RowAddress);
		expect(indexToRowAddress(4 as RowIndex)).toBe("5" as RowAddress);
		expect(indexToRowAddress(99 as RowIndex)).toBe("100" as RowAddress);
	});
});

describe("cellAddressToIndexes", () => {
	it("should convert a cell address to row and column indexes", () => {
		expect(cellAddressToIndexes("A1" as CellAddress)).toEqual([0 as RowIndex, 0 as ColumnIndex]);
		expect(cellAddressToIndexes("C5" as CellAddress)).toEqual([4 as RowIndex, 2 as ColumnIndex]);
		expect(cellAddressToIndexes("Z11" as CellAddress)).toEqual([10 as RowIndex, 25 as ColumnIndex]);
		expect(cellAddressToIndexes("AA1" as CellAddress)).toEqual([0 as RowIndex, 26 as ColumnIndex]);
		expect(cellAddressToIndexes("ZZ100" as CellAddress)).toEqual([99 as RowIndex, 701 as ColumnIndex]);
	});
});

describe("getBoxRangeFirstCell", () => {
	it("should return the start cell of a range address", () => {
		expect(getBoxRangeFirstCell("A1:B2" as BoxRangeAddress)).toBe("A1" as CellAddress);
		expect(getBoxRangeFirstCell("C3:D4" as BoxRangeAddress)).toBe("C3" as CellAddress);
		expect(getBoxRangeFirstCell("E5" as BoxRangeAddress)).toBe("E5" as CellAddress); // Single cell address
	});
});

describe("getBoxRangeLastCell", () => {
	it("should return the end cell of a range address", () => {
		expect(getBoxRangeLastCell("A1:B2" as BoxRangeAddress)).toBe("B2" as CellAddress);
		expect(getBoxRangeLastCell("C3:D4" as BoxRangeAddress)).toBe("D4" as CellAddress);
		expect(getBoxRangeLastCell("E5" as BoxRangeAddress)).toBe("E5" as CellAddress); // Single cell address
	});
});
