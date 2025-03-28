import type { DriveItemPath } from "../models/DriveItemPath.ts";
import { generateRandomString } from "./random.ts";

export function generateTempFileName(extension: string | null = "tmp"): DriveItemPath {
	const body = generateRandomString(16);
	return `~${body}.${extension}` as DriveItemPath;
}
