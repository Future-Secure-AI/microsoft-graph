import InvalidArgumentError from "../errors/InvalidArgumentError.js";
import ProtocolError from "../errors/ProtocolError.js";
import type { DriveItemId } from "../models/DriveItemId.js";
import type { DriveItemPath } from "../models/DriveItemPath.js";
import type { DriveItemRef } from "../models/DriveItemRef.js";
import type { DriveRef } from "../models/DriveRef.js";

const segmentPattern = /^[^"*:<>?\\|#]{1,256}$/;

const reservedNames = [
    "CON", "PRN", "AUX", "NUL",
    "COM1", "COM2", "COM3", "COM4", "COM5", "COM6", "COM7", "COM8", "COM9",
    "LPT1", "LPT2", "LPT3", "LPT4", "LPT5", "LPT6", "LPT7", "LPT8", "LPT9"
];

export const rootDriveItemPath = driveItemPath("/");

/** Create a drive item path from a given set of segments. Ie ["a","b"] => "/a/b" */
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

export function driveItemRef(driveRef: DriveRef, itemId: DriveItemId | undefined): DriveItemRef {
    if (!itemId) {
        throw new ProtocolError("Folder ID is missing");
    }

    return {
        ...driveRef,
        itemId
    };
}

export function generateTempFileName(extension: string | null = "tmp"): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    const length = 16;
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        result += characters[randomIndex];
    }
    return `~${result}.${extension}`;
}