import type { DriveRef } from "../DriveRef.js";
import type { DriveItemId } from "./DriveItemId.js";

export type DriveItemRef = DriveRef & {
    itemId: DriveItemId;
};
