import ProtocolError from "../errors/ProtocolError.ts";
import type { DriveItemPath } from "../models/DriveItemPath.ts";
import type { DriveItemRef } from "../models/DriveItemRef.ts";
import type { DriveRef } from "../models/DriveRef.ts";
import type { DriveItem } from "../models/Dto.ts";
import listDriveItemsOp from "../operations/driveItem/listDriveItems.ts";
import { driveItemRef } from "../services/driveItem.ts";

export default async function listDriveItemRefs(driveRef: DriveRef, itemPath: DriveItemPath): Promise<(DriveItemRef & DriveItem)[]> {
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