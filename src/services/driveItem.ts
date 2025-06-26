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
	for (const segment of segments) {
		if (segment === "") {
			throw new InvalidArgumentError("Segment cannot be an empty string.");
		}

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

	let path = `${segments.join("/")}`;

	if (!path.startsWith("/")) {
		path = `/${path}`;
	}

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
