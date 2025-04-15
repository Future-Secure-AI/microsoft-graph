import { describe, expect, it } from "vitest";
import { inferObjectRange, inferRangeAddress, inferRangeObject } from "./rangeManipulation.ts";

describe("inferRangeAddress", () => {
	it("should return the correct address for a valid 2D array", () => {
		expect(
			inferRangeAddress([
				[1, 2],
				[3, 4],
			]),
		).toBe("A1:B2");
		expect(inferRangeAddress([[1]])).toBe("A1");
	});

	it("should throw an error if rows have inconsistent column counts", () => {
		expect(() => inferRangeAddress([[1, 2], [3]])).toThrow("All rows must have the same number of columns");
	});

	it("should return 'A1' for an empty array", () => {
		expect(inferRangeAddress([])).toBe("A1");
	});
});

describe("inferRangeObject", () => {
	it("should convert a 2D array to an array of objects using the first row as keys", () => {
		const values = [
			["name", "age"],
			["Alice", 25],
			["Bob", 30],
		];
		expect(inferRangeObject(values)).toEqual([
			{ name: "Alice", age: 25 },
			{ name: "Bob", age: 30 },
		]);
	});

	it("should throw an error if rows have inconsistent column counts", () => {
		const values = [["name", "age"], ["Alice", 25], ["Bob"]];
		expect(() => inferRangeObject(values)).toThrow("Row 1 length must match header length");
	});

	it("should throw an error if the array does not contain a header row", () => {
		expect(() => inferRangeObject([])).toThrow("Does not contain a header row");
	});
});

describe("inferObjectRange", () => {
	it("should convert an array of objects to a 2D array with a header row", () => {
		const objs = [
			{ name: "Alice", age: 25 },
			{ name: "Bob", age: 30 },
		];
		expect(inferObjectRange(objs)).toEqual([
			["name", "age"],
			["Alice", 25],
			["Bob", 30],
		]);
	});

	it("should handle objects with inconsistent keys", () => {
		const objs = [
			{ name: "Alice", age: 25 },
			{ name: "Bob", gender: "Male" },
		];
		expect(inferObjectRange(objs)).toEqual([
			["name", "age", "gender"],
			["Alice", 25, undefined],
			["Bob", undefined, "Male"],
		]);
	});

	it("should return an empty array for an empty input", () => {
		expect(inferObjectRange([])).toEqual([]);
	});
});
