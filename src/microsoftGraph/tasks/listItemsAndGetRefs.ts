import { execute } from "../graphApi.js";
import type { DriveItemPath } from "../models/DriveItemPath.js";
import type { DriveItemRef } from "../models/DriveItemRef.js";
import type { DriveRef } from "../models/DriveRef.js";
import listDriveItems from "../operations/driveItem/listDriveItems.js";

export type NamedDriveItemRef = DriveItemRef & {
    name: string;
};

export default async function listItemsAndGetRefs(driveRef: DriveRef, itemPath: DriveItemPath): Promise<NamedDriveItemRef[]> {
    const [list] = await execute(listDriveItems(driveRef, itemPath));

    const items = list.value.map((item) => {
        if (item.id === undefined) {
            throw new Error("Item id is undefined");
        }
        if (!item.name) {
            throw new Error("Item name is undefined");
        }

        return {
            ...driveRef,
            itemId: item.id,
            name: item.name,
        }
    });

    return items;
}