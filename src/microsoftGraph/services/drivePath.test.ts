import { describe, expect, it } from "vitest";
import InvalidArgumentError from "../errors/InvalidArgumentError.js";
import { drivePath } from "./drivePath.js";

describe("driveItemPath", () => {
    it("throws an error for empty segment", () => {
        expect(() => drivePath("")).toThrow(InvalidArgumentError);
    });

    it.each([
        [["a"], "/a"],
        [["a", "b"], "/a/b"],
        [["a", "b", "c.txt"], "/a/b/c.txt"],
        [["/a"], "/a"],
        [[], "/"],
    ])("parses %s", (segments, expected) => {
        expect(drivePath(...segments)).toEqual(expected);
    });
});