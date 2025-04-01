import { describe, expect, it } from "vitest";
import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import UnsupportedAddressTypeError from "../errors/UnsupportedAddressTypeError.ts";
import type { Address, CellAddress, CellRangeAddress, ColumnAddress, ColumnRangeAddress, RowAddress, RowRangeAddress } from "../models/Address.ts";
import type { ColumnIndex } from "../models/ColumnIndex.ts";
import type { RowIndex } from "../models/RowIndex.ts";
import {
	cellAddressToIndexes,
	columnAddressToIndex,
	composeAddress,
	decomposeAddress,
	decrementRow,
	getAddressFirstCell,
	getAddressLastCell,
	getFirstColumn,
	getFirstRow,
	getLastColumn,
	getLastRow,
	incrementRow,
	indexesToCellAddress,
	indexToColumnAddress,
	indexToRowAddress,
	offsetRow,
	rowAddressToIndex,
} from "./address.ts";

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
		expect(getAddressFirstCell("C3:D4" as CellRangeAddress)).toBe("C3" as CellAddress);
		expect(getAddressFirstCell("Sheet!A1:B2" as CellRangeAddress)).toBe("A1" as CellAddress);
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
		expect(getAddressLastCell("C3:D4" as CellRangeAddress)).toBe("D4" as CellAddress);
		expect(getAddressLastCell("Sheet!A1:B2" as CellRangeAddress)).toBe("B2" as CellAddress);
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

describe("getFirstRow", () => {
	it("should return the first row of a row range", () => {
		expect(getFirstRow("1:5")).toBe("1");
		expect(getFirstRow("Sheet!1:10" as Address)).toBe("1");
	});

	it("should throw for column addresses", () => {
		expect(() => getFirstRow("A")).toThrow(UnsupportedAddressTypeError);
		expect(() => getFirstRow("A:C")).toThrow(UnsupportedAddressTypeError);
	});

	it("should handle cell ranges", () => {
		expect(getFirstRow("A1:C5")).toBe("A1:C1");
	});
});

describe("getFirstRow with cell addresses", () => {
	it("should return the first row of a single cell address", () => {
		expect(getFirstRow("A1" as CellAddress)).toBe("A1");
		expect(getFirstRow("Sheet!B2" as CellAddress)).toBe("B2");
	});

	it("should handle cell ranges", () => {
		expect(getFirstRow("A1:C5" as CellRangeAddress)).toBe("A1:C1");
	});
});

describe("getFirstRow with single cell address", () => {
	it("should return the same cell address for a single cell", () => {
		expect(getFirstRow("C1" as CellAddress)).toBe("C1");
	});
});

describe("getLastRow", () => {
	it("should return the last row of a row range", () => {
		expect(getLastRow("1:5")).toBe("5");
		expect(getLastRow("Sheet!1:10" as Address)).toBe("10");
	});

	it("should throw for column addresses", () => {
		expect(() => getLastRow("A")).toThrow(UnsupportedAddressTypeError);
		expect(() => getLastRow("A:C")).toThrow(UnsupportedAddressTypeError);
	});

	it("should handle cell ranges", () => {
		expect(getLastRow("A1:C5")).toBe("A5:C5");
	});
});

describe("getLastRow with cell addresses", () => {
	it("should return the last row of a single cell address", () => {
		expect(getLastRow("A1" as CellAddress)).toBe("A1");
		expect(getLastRow("Sheet!B2" as CellAddress)).toBe("B2");
	});

	it("should handle cell ranges", () => {
		expect(getLastRow("A1:C5" as CellRangeAddress)).toBe("A5:C5");
	});
});

describe("getLastRow with single cell address", () => {
	it("should return the same cell address for a single cell", () => {
		expect(getLastRow("C1" as CellAddress)).toBe("C1");
	});
});

describe("getFirstColumn", () => {
	it("should return the first column of a column range", () => {
		expect(getFirstColumn("A:C")).toBe("A");
		expect(getFirstColumn("Sheet!A:Z" as Address)).toBe("A");
	});

	it("should throw for row addresses", () => {
		expect(() => getFirstColumn("1")).toThrow(UnsupportedAddressTypeError);
		expect(() => getFirstColumn("1:5")).toThrow(UnsupportedAddressTypeError);
	});

	it("should handle cell ranges", () => {
		expect(getFirstColumn("A1:C5")).toBe("A1:A5");
	});
});

describe("getFirstColumn with cell addresses", () => {
	it("should return the first column of a single cell address", () => {
		expect(getFirstColumn("A1" as CellAddress)).toBe("A1");
		expect(getFirstColumn("Sheet!B2" as CellAddress)).toBe("B2");
	});

	it("should handle cell ranges", () => {
		expect(getFirstColumn("A1:C5" as CellRangeAddress)).toBe("A1:A5");
	});
});

describe("getFirstColumn with single cell address", () => {
	it("should return the same cell address for a single cell", () => {
		expect(getFirstColumn("C1" as CellAddress)).toBe("C1");
	});
});

describe("getLastColumn", () => {
	it("should return the last column of a column range", () => {
		expect(getLastColumn("A:C")).toBe("C");
		expect(getLastColumn("Sheet!A:Z" as Address)).toBe("Z");
	});

	it("should throw for row addresses", () => {
		expect(() => getLastColumn("1")).toThrow(UnsupportedAddressTypeError);
		expect(() => getLastColumn("1:5")).toThrow(UnsupportedAddressTypeError);
	});

	it("should handle cell ranges", () => {
		expect(getLastColumn("A1:C5")).toBe("C1:C5");
	});
});

describe("getLastColumn with cell addresses", () => {
	it("should return the last column of a single cell address", () => {
		expect(getLastColumn("A1" as CellAddress)).toBe("A1");
		expect(getLastColumn("Sheet!B2" as CellAddress)).toBe("B2");
	});

	it("should handle cell ranges", () => {
		expect(getLastColumn("A1:C5" as CellRangeAddress)).toBe("C1:C5");
	});
});

describe("getLastColumn with single cell address", () => {
	it("should return the same cell address for a single cell", () => {
		expect(getLastColumn("C1" as CellAddress)).toBe("C1");
	});
});

describe("offsetRow", () => {
	it("should offset rows in a row range", () => {
		expect(offsetRow("1:5", 2)).toBe("3:7");
		expect(offsetRow("Sheet!1:10" as Address, -1)).toBe("0:9");
	});

	it("should offset rows in a cell range", () => {
		expect(offsetRow("A1:C5", 2)).toBe("A3:C7");
		expect(offsetRow("Sheet!A1:C5" as Address, -1)).toBe("A0:C4");
	});

	it("should throw for unsupported address types", () => {
		expect(() => offsetRow("A", 1)).toThrow(UnsupportedAddressTypeError);
		expect(() => offsetRow("A:C", 1)).toThrow(UnsupportedAddressTypeError);
	});

	it("should throw if offset exceeds valid range", () => {
		expect(() => offsetRow("1:5", -10)).toThrow(Error);
		expect(() => offsetRow("A1:C5", 1048577)).toThrow(Error);
	});
});

describe("offsetRow with cell addresses", () => {
	it("should offset rows in a single cell address", () => {
		expect(offsetRow("A1" as CellAddress, 2)).toBe("A3");
		expect(offsetRow("Sheet!B2" as CellAddress, -1)).toBe("B1");
	});

	it("should offset rows in a cell range", () => {
		expect(offsetRow("A1:C5" as CellRangeAddress, 2)).toBe("A3:C7");
		expect(offsetRow("Sheet!A1:C5" as CellRangeAddress, -1)).toBe("A0:C4");
	});

	it("should throw if offset exceeds valid range", () => {
		expect(() => offsetRow("A1" as CellAddress, -2)).toThrow(Error);
		expect(() => offsetRow("A1:C5" as CellRangeAddress, 1048577)).toThrow(Error);
	});
});

describe("offsetRow with single cell address", () => {
	it("should offset the row of a single cell address", () => {
		expect(offsetRow("C1" as CellAddress, 2)).toBe("C3");
		expect(offsetRow("C1" as CellAddress, -1)).toBe("C0");
	});

	it("should throw if offset exceeds valid range", () => {
		expect(() => offsetRow("C1" as CellAddress, -2)).toThrow(Error);
		expect(() => offsetRow("C1" as CellAddress, 1048577)).toThrow(Error);
	});
});

describe("incrementRow", () => {
	it("should increment the row of a row range", () => {
		expect(incrementRow("1:5")).toBe("2:6");
	});

	it("should increment the row of a cell range", () => {
		expect(incrementRow("A1:C5")).toBe("A2:C6");
	});
});

describe("decrementRow", () => {
	it("should decrement the row of a row range", () => {
		expect(decrementRow("2:6")).toBe("1:5");
	});

	it("should decrement the row of a cell range", () => {
		expect(decrementRow("A2:C6")).toBe("A1:C5");
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
