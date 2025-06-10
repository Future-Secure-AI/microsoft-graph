import { describe, expect, it } from "vitest";
import type { ColumnOffset } from "../models/ColumnOffset.ts";
import type { RowOffset } from "../models/Row.ts";
import { addressToCartesian, cartesianToAddress } from "./cartesianAddress.ts";

describe("addressToCartesian", () => {
	it("should convert a cell range address to Cartesian coordinates", () => {
		expect(addressToCartesian("A1:C3")).toEqual({ ax: 0 as ColumnOffset, ay: 0 as RowOffset, bx: 2 as ColumnOffset, by: 2 as RowOffset });
		expect(addressToCartesian("B2:D4")).toEqual({ ax: 1 as ColumnOffset, ay: 1 as RowOffset, bx: 3 as ColumnOffset, by: 3 as RowOffset });
	});

	it("should handle single cell addresses", () => {
		expect(addressToCartesian("A1")).toEqual({ ax: 0 as ColumnOffset, ay: 0 as RowOffset, bx: 0 as ColumnOffset, by: 0 as RowOffset });
		expect(addressToCartesian("C3")).toEqual({ ax: 2 as ColumnOffset, ay: 2 as RowOffset, bx: 2 as ColumnOffset, by: 2 as RowOffset });
	});
});

describe("cartesianToAddress", () => {
	it("should convert Cartesian coordinates to a cell range address", () => {
		expect(cartesianToAddress({ ax: 0 as ColumnOffset, ay: 0 as RowOffset, bx: 2 as ColumnOffset, by: 2 as RowOffset })).toBe("A1:C3");
		expect(cartesianToAddress({ ax: 1 as ColumnOffset, ay: 1 as RowOffset, bx: 3 as ColumnOffset, by: 3 as RowOffset })).toBe("B2:D4");
	});

	it("should convert Cartesian coordinates to a cell range address with multiple characters", () => {
		expect(cartesianToAddress({ ax: 0 as ColumnOffset, ay: 0 as RowOffset, bx: 26 as ColumnOffset, by: 10 as RowOffset })).toBe("A1:AA11");
	});

	it("should handle single cell Cartesian coordinates", () => {
		expect(cartesianToAddress({ ax: 0 as ColumnOffset, ay: 0 as RowOffset, bx: 0 as ColumnOffset, by: 0 as RowOffset })).toBe("A1");
		expect(cartesianToAddress({ ax: 2 as ColumnOffset, ay: 2 as RowOffset, bx: 2 as ColumnOffset, by: 2 as RowOffset })).toBe("C3");
	});

	it("throws error when end column is before start column", () => {
		expect(() => cartesianToAddress({ ax: 0 as ColumnOffset, ay: 1 as RowOffset, bx: 0 as ColumnOffset, by: 0 as RowOffset })).toThrow();
	});

	it("throws error when end row is before start row", () => {
		expect(() => cartesianToAddress({ ax: 1 as ColumnOffset, ay: 0 as RowOffset, bx: 0 as ColumnOffset, by: 0 as RowOffset })).toThrow();
	});
});
