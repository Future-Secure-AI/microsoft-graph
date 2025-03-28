import type { DriveItemId } from "./DriveItemId.ts";
import type { DriveRef } from "./DriveRef.ts";

export type DriveItemRef = DriveRef & {
	itemId: DriveItemId;
};
