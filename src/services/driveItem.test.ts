import { describe, expect, it } from "vitest";
import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import { driveItemPath } from "./driveItem.ts";

describe("driveItemPath", () => {
	it("throws an error for empty segment", () => {
		expect(() => driveItemPath("")).toThrow(InvalidArgumentError);
	});

	it.each([
		[["a"], "/a"],
		[["a", "b"], "/a/b"],
		[["a", "b", "c.txt"], "/a/b/c.txt"],
		[["/a"], "/a"],
		[[], "/"],
	])("parses %s", (segments, expected) => {
		expect(driveItemPath(...segments)).toEqual(expected);
	});
});
