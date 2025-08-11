/**
 * Utilities for working with Microsoft Graph Drive Items (files and folders).
 * @module driveItem
 * @category Services
 */

import type { DriveItem } from "@microsoft/microsoft-graph-types";
import path from "node:path";
import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import ProtocolError from "../errors/ProtocolError.ts";
import type { DriveRef } from "../models/Drive.ts";
import type { DriveItemId, DriveItemPath, DriveItemRef } from "../models/DriveItem.ts";

const segmentPattern = /^[^"*:<>?\\|#]{1,256}$/;

const reservedNames = ["CON", "PRN", "AUX", "NUL", "COM1", "COM2", "COM3", "COM4", "COM5", "COM6", "COM7", "COM8", "COM9", "LPT1", "LPT2", "LPT3", "LPT4", "LPT5", "LPT6", "LPT7", "LPT8", "LPT9"];

export const workbookFileExtension = "xlsx";
export const binaryWorkbookFileExtension = "xlsb";

export const rootDriveItemPath = driveItemPath("/");

/**
 * Creates a drive item path from a given set of segments.
 * @param segments - The segments of the path.
 * @returns The constructed drive item path.
 * @throws InvalidArgumentError if a segment is invalid or the path exceeds 400 characters.
 */
export function driveItemPath(...segments: string[]): DriveItemPath {
	// Throw if any original segment is an empty string
	if (segments.some((seg) => seg === "")) {
		throw new InvalidArgumentError("Segment cannot be an empty string.");
	}
	// Special case: if no segments, return root
	if (segments.length === 0) {
		return "/" as DriveItemPath;
	}

	// Remove leading/trailing slashes from all segments except if the segment is exactly "/"
	const cleanedSegments = segments
		.map((seg, i) => {
			if (seg === "/") return i === 0 ? "" : seg; // root as first segment becomes empty, else keep
			return seg.replace(/^\/+|\/+$/g, "");
		})
		.filter((seg, i) => !(i === 0 && seg === "")); // remove empty first segment (root)

	// If any segment is empty after cleaning, throw (except for the special root case handled above)
	if (cleanedSegments.some((seg) => seg === "")) {
		throw new InvalidArgumentError("Segment cannot be an empty string.");
	}

	for (const segment of cleanedSegments) {
		if (!segmentPattern.test(segment)) {
			throw new InvalidArgumentError(`Segment '${segment}' does not match required pattern '${segmentPattern}'.`);
		}
		if (reservedNames.includes(segment.toUpperCase())) {
			throw new InvalidArgumentError(`Segment '${segment}' is a reserved name.`);
		}
		if (segment.endsWith(".")) {
			throw new InvalidArgumentError(`Segment '${segment}' cannot end with a period.`);
		}
	}

	const path = `/${cleanedSegments.join("/")}`;

	if (path.includes("//")) {
		throw new InvalidArgumentError("Path cannot contain consecutive slashes.");
	}

	if (path.length > 400) {
		throw new InvalidArgumentError("Path length exceeds 400 characters.");
	}

	return path as DriveItemPath;
}

/**
 * Creates a reference to a drive item.
 * @param driveRef - The reference to the drive.
 * @param itemId - The ID of the drive item.
 * @returns A reference to the drive item.
 * @throws ProtocolError if the item ID is missing.
 */
export function createDriveItemRef(driveRef: DriveRef, itemId: DriveItemId | undefined): DriveItemRef {
	if (!itemId) {
		throw new ProtocolError("ItemID is missing");
	}

	return {
		context: driveRef.context,
		siteId: driveRef.siteId,
		driveId: driveRef.driveId,
		itemId,
	};
}

/**
 * Splits a drive item path into its folder path and file name.
 * @param filePath - The full path of the file.
 * @returns An object containing the folder path and file name.
 */
export function splitDriveItemPath(filePath: DriveItemPath): { folderPath: DriveItemPath; fileName: string } {
	if (!filePath.startsWith("/")) {
		throw new InvalidArgumentError("File path must start with a '/'");
	}
	const pos = filePath.lastIndexOf("/");

	const fileName = filePath.substring(pos + 1);
	const folderPath = (pos === 0 ? "/" : filePath.substring(0, pos)) as DriveItemPath;

	return {
		folderPath,
		fileName,
	};
}

/**
 * Gets the file extension of a drive item.
 * @param item Drive item.
 * @returns File extension ie. "txt", "jpg"
 */
export function getDriveItemExtension(item: DriveItem): string {
	const ext = path.extname(item.name ?? "").toLowerCase();
	return ext.startsWith(".") ? ext.slice(1) : ext;
}

/**
 * Gets the parent for a drive item. Typically this is the folder of a file.
 * @param item Drive item.
 * @returns Parent drive item.
 */
export function getDriveItemParent(item: DriveItem & DriveItemRef): DriveItemRef {
	const parentId = item.parentReference?.id as DriveItemId | undefined;
	if (!parentId) {
		throw new Error("Parent reference not found for the item.");
	}

	const parentRef: DriveItemRef = {
		context: item.context,
		siteId: item.siteId,
		driveId: item.driveId,
		itemId: parentId,
	};

	return parentRef;
}
