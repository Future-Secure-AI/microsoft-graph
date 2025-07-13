/**
 * Drive pointers.
 * @module Drive
 * @category Models
 */

import type { SiteRef } from "./Site.ts";

/**
 * Identifier for a drive.
 */
export type DriveId = string & {
	readonly __brand: unique symbol;
};

/**
 * Reference to a drive.
 */
export type DriveRef = SiteRef & {
	driveId: DriveId;
};

/**
 * Name of a drive.
 */
export type DriveName = string & {
	readonly __brand: unique symbol;
};
