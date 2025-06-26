import type { DriveItem } from "@microsoft/microsoft-graph-types";
import { describe, expect, it } from "vitest";
import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import type { DriveItemPath } from "../models/DriveItem.ts";
import { driveItemPath, getDriveItemExtension, splitDriveItemPath } from "./driveItem.ts";

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

describe("splitDriveItemPath", () => {
	it("splits a file in root directory", () => {
		const result = splitDriveItemPath("/file.txt" as DriveItemPath);
		expect(result.folderPath).toEqual("/");
		expect(result.fileName).toEqual("file.txt");
	});

	it("splits a file in a directory", () => {
		const result = splitDriveItemPath("/folder/file.txt" as DriveItemPath);
		expect(result.folderPath).toEqual("/folder");
		expect(result.fileName).toEqual("file.txt");
	});

	it("splits a file in a nested directory", () => {
		const result = splitDriveItemPath("/parent/folder/file.txt" as DriveItemPath);
		expect(result.folderPath).toEqual("/parent/folder");
		expect(result.fileName).toEqual("file.txt");
	});
});

describe("getDriveItemExtension", () => {
	it("returns the extension without a dot for a file with extension", () => {
		const item: Partial<DriveItem> = { name: "file.txt" };
		expect(getDriveItemExtension(item as DriveItem)).toBe("txt");
	});

	it("returns an empty string for a file with no extension", () => {
		const item: Partial<DriveItem> = { name: "file" };
		expect(getDriveItemExtension(item as DriveItem)).toBe("");
	});

	it("returns the extension in lowercase", () => {
		const item: Partial<DriveItem> = { name: "file.PDF" };
		expect(getDriveItemExtension(item as DriveItem)).toBe("pdf");
	});

	it("returns an empty string if name is undefined", () => {
		const item: Partial<DriveItem> = {};
		expect(getDriveItemExtension(item as DriveItem)).toBe("");
	});

	it("handles files with multiple dots", () => {
		const item: Partial<DriveItem> = { name: "archive.tar.gz" };
		expect(getDriveItemExtension(item as DriveItem)).toBe("gz");
	});
});
