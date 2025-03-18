import InvalidArgumentError from "../errors/InvalidArgumentError.js";
import { execute } from "../graphApi.js";
import type { DriveItemId } from "../models/DriveItemId.js";
import type { DriveItemPath } from "../models/DriveItemPath.js";
import type { DriveItemRef } from "../models/DriveItemRef.js";
import type { DriveRef } from "../models/DriveRef.js";
import type { WorkbookRef } from "../models/WorkbookRef.js";
import deleteDriveItem from "../operations/driveItem/deleteDriveItem.js";
import createWorkbookInner from "../operations/workbook/createWorkbook.js";
import closeWorkbookSession from "../operations/workbookSession/closeWorkbookSession.js";
import createWorkbookSession from "../operations/workbookSession/createWorkbookSession.js";
import { defaultDriveId, defaultSiteId } from "../services/configuration.js";
import { sleep } from "../services/sleep.js";

/** Opinionated convenience helper to start a workbook session. Includes starting a session. */
export async function openWorkbookWithSession(itemRef: DriveItemRef): Promise<WorkbookRef> {
    const [session] = await execute(createWorkbookSession(itemRef));

    return {
        ...itemRef,
        sessionId: session.id,
    }
}

export async function openWorkbookInDefaultDrive(itemId: DriveItemId): Promise<WorkbookRef> {
    const itemRef: DriveItemRef = {
        siteId: defaultSiteId,
        driveId: defaultDriveId,
        itemId: itemId
    }

    const [session] = await execute(createWorkbookSession(itemRef));

    return {
        ...itemRef,
        sessionId: session.id,
    }
}

export const workbookFileExtension = ".xlsx";
export async function createWorkbookAndOpenSession(driveRef: DriveRef, itemPath: DriveItemPath): Promise<WorkbookRef> {
    if (!itemPath.endsWith(workbookFileExtension)) {
        throw new InvalidArgumentError(`Item path must end with '${workbookFileExtension}'`);
    }

    const [item] = await execute(createWorkbookInner(driveRef, itemPath));

    if (item.id === undefined) {
        throw new Error("Item id is undefined");
    }
    const itemRef: DriveItemRef = {
        ...driveRef,
        itemId: item.id,
    };

    const [session] = await execute(createWorkbookSession(itemRef));

    const workbookRef: WorkbookRef = {
        ...driveRef,
        itemId: item.id,
        sessionId: session.id,
    }

    return workbookRef;
}

export async function closeSessionAndDeleteWorkbook(workbookRef: WorkbookRef): Promise<void> {
    await execute(closeWorkbookSession(workbookRef));
    await sleep(1000); // Close session takes a moment to release the file lock
    await execute(deleteDriveItem(workbookRef));
}