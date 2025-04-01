import { describe, expect, it } from "vitest";
import type { ColumnIndex } from "../models/ColumnIndex.ts";
import type { RowIndex } from "../models/RowIndex.ts";
import { columnAddressToIndex, indexToColumnAddress, indexToRowAddress, rowAddressToIndex } from "./addressIndexing.ts";

describe("addressIndexing", () => {
	describe("columnAddressToIndex", () => {
		it("should convert column address to index", () => {
			expect(columnAddressToIndex("A")).toBe(0);
			expect(columnAddressToIndex("B")).toBe(1);
			expect(columnAddressToIndex("Z")).toBe(25);
			expect(columnAddressToIndex("AA")).toBe(26);
			expect(columnAddressToIndex("AB")).toBe(27);
			expect(columnAddressToIndex("AZ")).toBe(51);
			expect(columnAddressToIndex("BA")).toBe(52);
		});
	});

	describe("indexToColumnAddress", () => {
		it("should convert index to column address", () => {
			expect(indexToColumnAddress(0 as ColumnIndex)).toBe("A");
			expect(indexToColumnAddress(1 as ColumnIndex)).toBe("B");
			expect(indexToColumnAddress(25 as ColumnIndex)).toBe("Z");
			expect(indexToColumnAddress(26 as ColumnIndex)).toBe("AA");
			expect(indexToColumnAddress(27 as ColumnIndex)).toBe("AB");
			expect(indexToColumnAddress(51 as ColumnIndex)).toBe("AZ");
			expect(indexToColumnAddress(52 as ColumnIndex)).toBe("BA");
		});
	});

	describe("rowAddressToIndex", () => {
		it("should convert row address to index", () => {
			expect(rowAddressToIndex("1")).toBe(0);
			expect(rowAddressToIndex("2")).toBe(1);
			expect(rowAddressToIndex("10")).toBe(9);
		});
	});

	describe("indexToRowAddress", () => {
		it("should convert index to row address", () => {
			expect(indexToRowAddress(0 as RowIndex)).toBe("1");
			expect(indexToRowAddress(1 as RowIndex)).toBe("2");
			expect(indexToRowAddress(9 as RowIndex)).toBe("10");
		});
	});
});
