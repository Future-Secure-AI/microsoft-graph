/**
 * Drive item pointers.
 * @module DriveItem
 * @category Models
 */

import type { DriveRef } from "./Drive.ts";

/**
 * Unique identifier of an item in a drive.
 */
export type DriveItemId = string & {
	readonly __brand: unique symbol;
};

/**
 * Path of an item in a drive.
 */
export type DriveItemPath = string & {
	readonly __brand: unique symbol;
};

/**
 * Reference to a drive item.
 */
export type DriveItemRef = DriveRef & {
	itemId: DriveItemId;
};

/**
 * File/folder name of a drive item. Includes file extension if applicable.
 */
export type DriveItemName = string & {
	readonly __brand: unique symbol;
};
