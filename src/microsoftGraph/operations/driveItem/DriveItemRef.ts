import type { DriveItemId } from "../../model/DriveItemId.js";
import type { DriveRef } from "../DriveRef.js";

export type DriveItemRef = DriveRef & {
    itemId: DriveItemId;
};
