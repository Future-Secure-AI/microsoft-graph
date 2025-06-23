// biome-ignore lint/style/useFilenamingConvention: Appropriate in this context

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
	__brand: "DriveId";
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
	__brand: "DriveName";
};
