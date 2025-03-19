import ProtocolError from "../errors/ProtocolError.js";
import type { DriveItemPath } from "../models/DriveItemPath.js";
import type { DriveItemRef } from "../models/DriveItemRef.js";
import type { DriveRef } from "../models/DriveRef.js";
import type { DriveItem } from "../models/Dto.js";
import listDriveItemsOp from "../operations/driveItem/listDriveItems.js";
import { driveItemRef } from "../services/driveItem.js";

export default async function listDriveItems(driveRef: DriveRef, itemPath: DriveItemPath): Promise<(DriveItemRef & DriveItem)[]> {
    const list = await listDriveItemsOp(driveRef, itemPath);

    const items = list.value.map((item) => {
        const itemRef = driveItemRef(driveRef, item.id);

        if (!item.name) {
            throw new ProtocolError("Item.name is undefined");
        }

        return {
            ...item,
            ...itemRef,
        }
    });

    return items;
}