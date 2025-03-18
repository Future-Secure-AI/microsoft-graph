import InvalidArgumentError from "../errors/InvalidArgumentError.js";
import ProtocolError from "../errors/ProtocolError.js";
import { executeSingle } from "../graphApi.js";
import type { DriveItemPath } from "../models/DriveItemPath.js";
import type { DriveItemRef } from "../models/DriveItemRef.js";
import type { DriveRef } from "../models/DriveRef.js";
import type { WorkbookRef } from "../models/WorkbookRef.js";
import createWorkbookInner from "../operations/workbook/createWorkbook.js";
import { workbookFileExtension } from "../services/workbookFile.js";
import createWorkbookSessionAndGetRef from "./createWorkbookSessionAndGetRef.js";

export default async function createWorkbookAndOpenSessionAndGetRef(driveRef: DriveRef, itemPath: DriveItemPath): Promise<WorkbookRef> {
    if (!itemPath.endsWith(workbookFileExtension)) {
        throw new InvalidArgumentError(`Item path must end with '${workbookFileExtension}'`);
    }

    const item = await executeSingle(createWorkbookInner(driveRef, itemPath));

    if (item.id === undefined) {
        throw new ProtocolError("Item.id is undefined");
    }

    const itemRef: DriveItemRef = {
        ...driveRef,
        itemId: item.id,
    };

    return await createWorkbookSessionAndGetRef(itemRef);
}
