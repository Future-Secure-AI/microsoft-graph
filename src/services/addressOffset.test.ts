import { describe, expect, it } from "vitest";
import type { ColumnOffset } from "../models/ColumnOffset.ts";
import type { RowOffset } from "../models/RowOffset.ts";
import { columnAddressToOffset, offsetToColumnAddress, offsetToRowAddress, rowAddressToOffset } from "./addressOffset.ts";

describe("columnAddressToOffset", () => {
	it("should convert column address to offset", () => {
		expect(columnAddressToOffset("A")).toBe(0);
		expect(columnAddressToOffset("B")).toBe(1);
		expect(columnAddressToOffset("Z")).toBe(25);
		expect(columnAddressToOffset("AA")).toBe(26);
		expect(columnAddressToOffset("AB")).toBe(27);
		expect(columnAddressToOffset("AZ")).toBe(51);
		expect(columnAddressToOffset("BA")).toBe(52);
	});
});

describe("offsetToColumnAddress", () => {
	it("should convert offset to column address", () => {
		expect(offsetToColumnAddress(0 as ColumnOffset)).toBe("A");
		expect(offsetToColumnAddress(1 as ColumnOffset)).toBe("B");
		expect(offsetToColumnAddress(25 as ColumnOffset)).toBe("Z");
		expect(offsetToColumnAddress(26 as ColumnOffset)).toBe("AA");
		expect(offsetToColumnAddress(27 as ColumnOffset)).toBe("AB");
		expect(offsetToColumnAddress(51 as ColumnOffset)).toBe("AZ");
		expect(offsetToColumnAddress(52 as ColumnOffset)).toBe("BA");
	});
});

describe("rowAddressToOffset", () => {
	it("should convert row address to offset", () => {
		expect(rowAddressToOffset("1")).toBe(0);
		expect(rowAddressToOffset("2")).toBe(1);
		expect(rowAddressToOffset("10")).toBe(9);
	});
});

describe("offsetToRowAddress", () => {
	it("should convert offset to row address", () => {
		expect(offsetToRowAddress(0 as RowOffset)).toBe("1");
		expect(offsetToRowAddress(1 as RowOffset)).toBe("2");
		expect(offsetToRowAddress(9 as RowOffset)).toBe("10");
	});
});
