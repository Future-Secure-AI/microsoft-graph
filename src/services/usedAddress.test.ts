import { describe, expect, it } from "vitest";
import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import type { CellRangeAddress, UsedAddress } from "../models/Address";
import { resolveUsedAddress } from "./usedAddress";

describe("resolveUsedRangeAddress", () => {
	const usedRange: CellRangeAddress = "B2:E10";

	it("resolves a full cell range address", () => {
		expect(resolveUsedAddress("C3:D5", usedRange)).toBe("C3:D5");
	});

	it("resolves a column used range address (C:)", () => {
		expect(resolveUsedAddress("C:", usedRange)).toBe("C2:E10");
	});

	it("resolves a column used range address (:D)", () => {
		expect(resolveUsedAddress(":D", usedRange)).toBe("B2:D10");
	});

	it("resolves a row used range address (3:)", () => {
		expect(resolveUsedAddress("3:", usedRange)).toBe("B3:E10");
	});

	it("resolves a row used range address (:5)", () => {
		expect(resolveUsedAddress(":5", usedRange)).toBe("B2:E5");
	});

	it("resolves a cell used range address (C3:)", () => {
		expect(resolveUsedAddress("C3:", usedRange)).toBe("C3:E10");
	});

	it("resolves a cell used range address (:D5)", () => {
		expect(resolveUsedAddress(":D5", usedRange)).toBe("B2:D5");
	});

	it("resolves the entire used range address (:) ", () => {
		expect(resolveUsedAddress(":", usedRange)).toBe("B2:E10");
	});

	it("throws on invalid address", () => {
		expect(() => resolveUsedAddress("invalid" as UsedAddress, usedRange)).toThrow(InvalidArgumentError);
	});

	it("returns null for non-overlapping column range", () => {
		expect(resolveUsedAddress("Z100:Z200", usedRange)).toBeNull();
	});

	it("returns null for non-overlapping single cell", () => {
		expect(resolveUsedAddress("A1:A1", usedRange)).toBeNull();
	});

	it("returns null for non-overlapping row range", () => {
		expect(resolveUsedAddress("B20:E30", usedRange)).toBeNull();
	});
});
