/**
 * Reference to a drive.
 * @module DriveRef
 * @category Models
 */

import type { DriveId } from "./DriveId.ts";
import type { SiteRef } from "./SiteRef.ts";

export type DriveRef = SiteRef & {
	driveId: DriveId;
};
