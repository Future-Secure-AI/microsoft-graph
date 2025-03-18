import ProtocolError from "../errors/ProtocolError.js";
import { executeSingle } from "../graphApi.js";
import type { DriveItemPath } from "../models/DriveItemPath.js";
import type { DriveItemRef } from "../models/DriveItemRef.js";
import type { DriveRef } from "../models/DriveRef.js";
import listDriveItems from "../operations/driveItem/listDriveItems.js";
import { driveItemRef } from "../services/driveItem.js";

export type NamedDriveItemRef = DriveItemRef & {
    name: string;
};

export default async function listItemsAndGetRefs(driveRef: DriveRef, itemPath: DriveItemPath): Promise<NamedDriveItemRef[]> {
    const list = await executeSingle(listDriveItems(driveRef, itemPath));

    const items = list.value.map((item) => {
        const itemRef = driveItemRef(driveRef, item.id);

        if (!item.name) {
            throw new ProtocolError("Item.name is undefined");
        }

        return {
            ...itemRef,
            name: item.name,
        }
    });

    return items;
}