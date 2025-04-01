import { describe, expect, it } from "vitest";
import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import UnsupportedAddressTypeError from "../errors/UnsupportedAddressTypeError.ts";
import type { Address, CellAddress, CellRangeAddress, ColumnAddress, ColumnRangeAddress, RowAddress, RowRangeAddress } from "../models/Address.ts";
import { composeAddress, decomposeAddress, decrementRowAddress, getFirstCellAddress, getFirstColumnAddress, getFirstRowAddress, getLastCellAddress, getLastColumnAddress, getLastRowAddress, incrementRowAddress, isAddressOverlapping, offsetAddress } from "./address.ts";

describe("getFirstCellAddress", () => {
	it("should return the start cell of a range address", () => {
		expect(getFirstCellAddress("C3:D4" as CellRangeAddress)).toBe("C3" as CellAddress);
		expect(getFirstCellAddress("Sheet!A1:B2" as CellRangeAddress)).toBe("A1" as CellAddress);
		expect(getFirstCellAddress("E5" as CellAddress)).toBe("E5" as CellAddress); // Single cell address
		expect(getFirstCellAddress("Sheet!E5" as CellAddress)).toBe("E5" as CellAddress); // Single cell address
		expect(getFirstCellAddress("C" as ColumnAddress)).toBe("C1" as CellAddress); // ColumnAddress
		expect(getFirstCellAddress("Sheet!C" as ColumnAddress)).toBe("C1"); // ColumnAddress
		expect(getFirstCellAddress("3" as RowAddress)).toBe("A3" as CellAddress); // RowAddress
		expect(getFirstCellAddress("Sheet!3" as RowAddress)).toBe("A3" as CellAddress); // RowAddress
		expect(getFirstCellAddress("A:Z" as ColumnRangeAddress)).toBe("A1" as CellAddress); // ColumnRangeAddress
		expect(getFirstCellAddress("Sheet!A:Z" as ColumnRangeAddress)).toBe("A1" as CellAddress); // ColumnRangeAddress
		expect(getFirstCellAddress("1:10" as RowRangeAddress)).toBe("A1" as CellAddress); // RowRangeAddress
		expect(getFirstCellAddress("Sheet!1:10" as RowRangeAddress)).toBe("A1" as CellAddress); // RowRangeAddress
	});
});

describe("getLastCellAddress", () => {
	it("should return the end cell of a range address", () => {
		expect(getLastCellAddress("C3:D4" as CellRangeAddress)).toBe("D4" as CellAddress);
		expect(getLastCellAddress("Sheet!A1:B2" as CellRangeAddress)).toBe("B2" as CellAddress);
		expect(getLastCellAddress("E5" as CellAddress)).toBe("E5" as CellAddress); // Single cell address
		expect(getLastCellAddress("Sheet!E5" as CellAddress)).toBe("E5" as CellAddress); // Single cell address
		expect(getLastCellAddress("C" as ColumnAddress)).toBe("C1048576" as CellAddress); // ColumnAddress
		expect(getLastCellAddress("Sheet!C" as ColumnAddress)).toBe("C1048576" as CellAddress); // ColumnAddress
		expect(getLastCellAddress("3" as RowAddress)).toBe("XFD3" as CellAddress); // RowAddress
		expect(getLastCellAddress("Sheet!3" as RowAddress)).toBe("XFD3" as CellAddress); // RowAddress
		expect(getLastCellAddress("A:Z" as ColumnRangeAddress)).toBe("Z1048576" as CellAddress); // ColumnRangeAddress
		expect(getLastCellAddress("Sheet!A:Z" as ColumnRangeAddress)).toBe("Z1048576" as CellAddress); // ColumnRangeAddress
		expect(getLastCellAddress("1:10" as RowRangeAddress)).toBe("XFD10" as CellAddress); // RowRangeAddress
		expect(getLastCellAddress("Sheet!1:10" as RowRangeAddress)).toBe("XFD10" as CellAddress); // RowRangeAddress
	});
});

describe("getFirstRowAddress", () => {
	it("should return the first row of a row range", () => {
		expect(getFirstRowAddress("1:5")).toBe("1");
		expect(getFirstRowAddress("Sheet!1:10" as Address)).toBe("1");
	});

	it("should return the first row of a column range", () => {
		expect(getFirstRowAddress("A")).toBe("A1");
		expect(getFirstRowAddress("A:C" as Address)).toBe("A1:C1");
	});

	it("should handle cell ranges", () => {
		expect(getFirstRowAddress("A1:C5")).toBe("A1:C1");
	});

	it("should return the first row of a single cell address", () => {
		expect(getFirstRowAddress("A1" as CellAddress)).toBe("A1");
		expect(getFirstRowAddress("Sheet!B2" as CellAddress)).toBe("B2");
	});

	it("should handle cell ranges", () => {
		expect(getFirstRowAddress("A1:C5" as CellRangeAddress)).toBe("A1:C1");
	});

	it("should return the same cell address for a single cell", () => {
		expect(getFirstRowAddress("C1" as CellAddress)).toBe("C1");
	});
});

describe("getLastRowAddress", () => {
	it("should return the last row of a row range", () => {
		expect(getLastRowAddress("1:5")).toBe("5");
		expect(getLastRowAddress("Sheet!1:10" as Address)).toBe("10");
	});

	it("should return the last row of a column range", () => {
		expect(getLastRowAddress("A")).toBe("A1048576");
		expect(getLastRowAddress("A:C" as Address)).toBe("A1048576:C1048576");
	});

	it("should handle cell ranges", () => {
		expect(getLastRowAddress("A1:C5")).toBe("A5:C5");
	});

	it("should return the last row of a single cell address", () => {
		expect(getLastRowAddress("A1" as CellAddress)).toBe("A1");
		expect(getLastRowAddress("Sheet!B2" as CellAddress)).toBe("B2");
	});

	it("should handle cell ranges", () => {
		expect(getLastRowAddress("A1:C5" as CellRangeAddress)).toBe("A5:C5");
	});

	it("should return the same cell address for a single cell", () => {
		expect(getLastRowAddress("C1" as CellAddress)).toBe("C1");
	});
});

describe("getFirstColumnAddress", () => {
	it("should return the first column of a column range", () => {
		expect(getFirstColumnAddress("A:C")).toBe("A");
		expect(getFirstColumnAddress("Sheet!A:Z" as Address)).toBe("A");
	});

	it("should return the first column of a row range", () => {
		expect(getFirstColumnAddress("1")).toBe("A1");
		expect(getFirstColumnAddress("1:5" as Address)).toBe("A1:A5");
	});

	it("should handle cell ranges", () => {
		expect(getFirstColumnAddress("A1:C5")).toBe("A1:A5");
	});

	it("should return the first column of a single cell address", () => {
		expect(getFirstColumnAddress("A1" as CellAddress)).toBe("A1");
		expect(getFirstColumnAddress("Sheet!B2" as CellAddress)).toBe("B2");
	});

	it("should handle cell ranges", () => {
		expect(getFirstColumnAddress("A1:C5" as CellRangeAddress)).toBe("A1:A5");
	});

	it("should return the same cell address for a single cell", () => {
		expect(getFirstColumnAddress("C1" as CellAddress)).toBe("C1");
	});
});

describe("getLastColumnAddress", () => {
	it("should return the last column of a column range", () => {
		expect(getLastColumnAddress("A:C")).toBe("C");
		expect(getLastColumnAddress("Sheet!A:Z" as Address)).toBe("Z");
	});

	it("should return the last column of a row range", () => {
		expect(getLastColumnAddress("1" as Address)).toBe("XFD1");
		expect(getLastColumnAddress("1:5" as Address)).toBe("XFD1:XFD5");
	});

	it("should handle cell ranges", () => {
		expect(getLastColumnAddress("A1:C5")).toBe("C1:C5");
	});

	it("should return the last column of a single cell address", () => {
		expect(getLastColumnAddress("A1" as CellAddress)).toBe("A1");
		expect(getLastColumnAddress("Sheet!B2" as CellAddress)).toBe("B2");
	});

	it("should handle cell ranges", () => {
		expect(getLastColumnAddress("A1:C5" as CellRangeAddress)).toBe("C1:C5");
	});

	it("should return the same cell address for a single cell", () => {
		expect(getLastColumnAddress("C1" as CellAddress)).toBe("C1");
	});
});

describe("offsetAddress", () => {
	it("should offset rows and columns in a cell range", () => {
		expect(offsetAddress("A1:C5", 2, 2)).toBe("C3:E7");
		expect(offsetAddress("Sheet!B2:C5" as Address, -1, -1)).toBe("A1:B4");
	});

	it("should offset rows only", () => {
		expect(offsetAddress("A1:C5", 2, 0)).toBe("A3:C7");
		expect(offsetAddress("Sheet!B1:C5" as Address, -1, 0)).toBe("A1:B4");
	});

	it("should offset columns only", () => {
		expect(offsetAddress("A1:C5", 0, 2)).toBe("C1:E5");
		expect(offsetAddress("Sheet!A2:C5" as Address, 0, -1)).toBe("Z1:B4");
	});

	it("should throw for unsupported address types", () => {
		expect(() => offsetAddress("A", 1, 0)).toThrow(UnsupportedAddressTypeError);
		expect(() => offsetAddress("1:5", 0, 1)).toThrow(UnsupportedAddressTypeError);
	});

	it("should throw if offset exceeds valid range", () => {
		expect(() => offsetAddress("A1:C5", 1048577, 0)).toThrow(Error);
		expect(() => offsetAddress("A1:C5", 0, 16385)).toThrow(Error);
	});

	it("should offset rows and columns in a single cell address", () => {
		expect(offsetAddress("A1" as CellAddress, 2, 2)).toBe("C3");
		expect(offsetAddress("Sheet!B2" as CellAddress, -1, -1)).toBe("A1");
	});
});

describe("incrementRowAddress", () => {
	it("should increment the row of a row range", () => {
		expect(incrementRowAddress("1:5")).toBe("2:6");
	});

	it("should increment the row of a cell range", () => {
		expect(incrementRowAddress("A1:C5")).toBe("A2:C6");
	});
});

describe("decrementRowAddress", () => {
	it("should decrement the row of a row range", () => {
		expect(decrementRowAddress("2:6")).toBe("1:5");
	});

	it("should decrement the row of a cell range", () => {
		expect(decrementRowAddress("A2:C6")).toBe("A1:C5");
	});
});

describe("decomposeAddress", () => {
	it("should parse a column address", () => {
		expect(decomposeAddress("A" as Address)).toEqual({
			startColumn: "A",
			endColumn: "A",
			startRow: "1",
			endRow: "1048576",
		});
	});

	it("should parse a row address", () => {
		expect(decomposeAddress("5" as Address)).toEqual({
			startColumn: "A",
			endColumn: "XFD",
			startRow: "5",
			endRow: "5",
		});
	});

	it("should parse a cell address", () => {
		expect(decomposeAddress("B3" as Address)).toEqual({
			startColumn: "B",
			endColumn: "B",
			startRow: "3",
			endRow: "3",
		});
	});

	it("should parse a column range address", () => {
		expect(decomposeAddress("A:C" as Address)).toEqual({
			startColumn: "A",
			endColumn: "C",
			startRow: "1",
			endRow: "1048576",
		});
	});

	it("should parse a row range address", () => {
		expect(decomposeAddress("1:10" as Address)).toEqual({
			startColumn: "A",
			endColumn: "XFD",
			startRow: "1",
			endRow: "10",
		});
	});

	it("should parse a cell range address", () => {
		expect(decomposeAddress("A1:C5" as Address)).toEqual({
			startColumn: "A",
			endColumn: "C",
			startRow: "1",
			endRow: "5",
		});
	});

	it("should throw an error for invalid addresses", () => {
		expect(() => decomposeAddress("InvalidAddress" as Address)).toThrow(InvalidArgumentError);
	});
});

describe("composeAddress", () => {
	it("should create a column address", () => {
		expect(
			composeAddress({
				startColumn: "A",
				endColumn: "A",
				startRow: "1",
				endRow: "1048576",
			}),
		).toBe("A" as ColumnAddress);
	});

	it("should create a row address", () => {
		expect(
			composeAddress({
				startColumn: "A",
				endColumn: "XFD",
				startRow: "5",
				endRow: "5",
			}),
		).toBe("5" as RowAddress);
	});

	it("should create a cell address", () => {
		expect(
			composeAddress({
				startColumn: "B",
				endColumn: "B",
				startRow: "3",
				endRow: "3",
			}),
		).toBe("B3" as CellAddress);
	});

	it("should create a column range address", () => {
		expect(
			composeAddress({
				startColumn: "A",
				endColumn: "C",
				startRow: "1",
				endRow: "1048576",
			}),
		).toBe("A:C" as ColumnRangeAddress);
	});

	it("should create a row range address", () => {
		expect(
			composeAddress({
				startColumn: "A",
				endColumn: "XFD",
				startRow: "1",
				endRow: "10",
			}),
		).toBe("1:10" as RowRangeAddress);
	});

	it("should create a cell range address", () => {
		expect(
			composeAddress({
				startColumn: "A",
				endColumn: "C",
				startRow: "1",
				endRow: "5",
			}),
		).toBe("A1:C5" as CellRangeAddress);
	});

	it("should throw an error for invalid address components", () => {
		expect(() =>
			composeAddress({
				startColumn: "C",
				endColumn: "A",
				startRow: "5",
				endRow: "1",
			}),
		).toThrow(InvalidArgumentError);
	});
});

describe("isAddressOverlapping", () => {
	it("should return true for overlapping cell ranges", () => {
		expect(isAddressOverlapping("A1:C3", "B2:D4")).toBe(true);
		expect(isAddressOverlapping("A1:B2", "A1:B2")).toBe(true); // Exact overlap
		expect(isAddressOverlapping("A1:D4", "B2:C3")).toBe(true); // Nested overlap
	});

	it("should return false for non-overlapping cell ranges", () => {
		expect(isAddressOverlapping("A1:B2", "C3:D4")).toBe(false);
		expect(isAddressOverlapping("A1:A1", "B1:B1")).toBe(false);
		expect(isAddressOverlapping("A1:A10", "B11:B20")).toBe(false);
	});

	it("should return true for overlapping row ranges", () => {
		expect(isAddressOverlapping("1:5", "3:7")).toBe(true);
		expect(isAddressOverlapping("1:10", "5:15")).toBe(true);
	});

	it("should return false for non-overlapping row ranges", () => {
		expect(isAddressOverlapping("1:5", "6:10")).toBe(false);
		expect(isAddressOverlapping("1:1", "2:2")).toBe(false);
	});

	it("should return true for overlapping column ranges", () => {
		expect(isAddressOverlapping("A:C", "B:D")).toBe(true);
		expect(isAddressOverlapping("A:Z", "M:N")).toBe(true);
	});

	it("should return false for non-overlapping column ranges", () => {
		expect(isAddressOverlapping("A:C", "D:F")).toBe(false);
		expect(isAddressOverlapping("A:A", "B:B")).toBe(false);
	});

	it("should handle single cell addresses", () => {
		expect(isAddressOverlapping("A1", "A1")).toBe(true); // Exact match
		expect(isAddressOverlapping("A1", "B2")).toBe(false); // No overlap
		expect(isAddressOverlapping("A1", "A2")).toBe(false); // Different rows
		expect(isAddressOverlapping("A1", "B1")).toBe(false); // Different columns
	});
});
