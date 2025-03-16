import type { DriveItemId } from "./DriveItemId.js";
import type { DriveRef } from "./DriveRef.js";

export type DriveItemRef = DriveRef & {
    itemId: DriveItemId;
};
