import { describe, expect, it } from "vitest";
import type { BoxRangeAddress, CellAddress, ColumnAddress, ColumnRangeAddress, RowAddress, RowRangeAddress } from "../models/Address.ts";
import type { ColumnIndex } from "../models/ColumnIndex.ts";
import type { RowIndex } from "../models/RowIndex.ts";
import { cellAddressToIndexes, columnAddressToIndex, getAddressFirstCell, getAddressLastCell, indexesToCellAddress, indexToColumnAddress, indexToRowAddress, rowAddressToIndex } from "./address.ts";

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

describe("getAddressFirstCell", () => {
	it("should return the start cell of a range address", () => {
		expect(getAddressFirstCell("C3:D4" as BoxRangeAddress)).toBe("C3" as CellAddress);
		expect(getAddressFirstCell("Sheet!A1:B2" as BoxRangeAddress)).toBe("A1" as CellAddress);
		expect(getAddressFirstCell("E5" as CellAddress)).toBe("E5" as CellAddress); // Single cell address
		expect(getAddressFirstCell("Sheet!E5" as CellAddress)).toBe("E5" as CellAddress); // Single cell address
		expect(getAddressFirstCell("C" as ColumnAddress)).toBe("C1" as CellAddress); // ColumnAddress
		expect(getAddressFirstCell("Sheet!C" as ColumnAddress)).toBe("C1" as CellAddress); // ColumnAddress
		expect(getAddressFirstCell("3" as RowAddress)).toBe("A3" as CellAddress); // RowAddress
		expect(getAddressFirstCell("Sheet!3" as RowAddress)).toBe("A3" as CellAddress); // RowAddress
		expect(getAddressFirstCell("A:Z" as ColumnRangeAddress)).toBe("A1" as CellAddress); // ColumnRangeAddress
		expect(getAddressFirstCell("Sheet!A:Z" as ColumnRangeAddress)).toBe("A1" as CellAddress); // ColumnRangeAddress
		expect(getAddressFirstCell("1:10" as RowRangeAddress)).toBe("A1" as CellAddress); // RowRangeAddress
		expect(getAddressFirstCell("Sheet!1:10" as RowRangeAddress)).toBe("A1" as CellAddress); // RowRangeAddress
	});
});

describe("getAddressLastCell", () => {
	it("should return the end cell of a range address", () => {
		expect(getAddressLastCell("C3:D4" as BoxRangeAddress)).toBe("D4" as CellAddress);
		expect(getAddressLastCell("Sheet!A1:B2" as BoxRangeAddress)).toBe("B2" as CellAddress);
		expect(getAddressLastCell("E5" as CellAddress)).toBe("E5" as CellAddress); // Single cell address
		expect(getAddressLastCell("Sheet!E5" as CellAddress)).toBe("E5" as CellAddress); // Single cell address
		expect(getAddressLastCell("C" as ColumnAddress)).toBe("C1048576" as CellAddress); // ColumnAddress
		expect(getAddressLastCell("Sheet!C" as ColumnAddress)).toBe("C1048576" as CellAddress); // ColumnAddress
		expect(getAddressLastCell("3" as RowAddress)).toBe("XFD3" as CellAddress); // RowAddress
		expect(getAddressLastCell("Sheet!3" as RowAddress)).toBe("XFD3" as CellAddress); // RowAddress
		expect(getAddressLastCell("A:Z" as ColumnRangeAddress)).toBe("Z1048576" as CellAddress); // ColumnRangeAddress
		expect(getAddressLastCell("Sheet!A:Z" as ColumnRangeAddress)).toBe("Z1048576" as CellAddress); // ColumnRangeAddress
		expect(getAddressLastCell("1:10" as RowRangeAddress)).toBe("XFD10" as CellAddress); // RowRangeAddress
		expect(getAddressLastCell("Sheet!1:10" as RowRangeAddress)).toBe("XFD10" as CellAddress); // RowRangeAddress
	});
});
