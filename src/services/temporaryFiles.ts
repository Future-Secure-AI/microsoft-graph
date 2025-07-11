/**
 * Utilities for generating temporary file names for use with Drive Items.
 * @module temporaryFiles
 * @category Services
 */

import type { DriveItemPath } from "../models/DriveItem.ts";
import { generateRandomString } from "./random.ts";

/**
 * Generates a temporary file name with the specified extension.
 * @param extension - The file extension. Defaults to "tmp".
 * @returns A temporary file name.
 */
export function generateTempFileName(extension: string | null = "tmp"): DriveItemPath {
	const body = generateRandomString(16);
	return `~${body}.${extension}` as DriveItemPath;
}
