import { execute } from "../graphApi.js";
import type { DriveItemId } from "../models/DriveItemId.js";
import type { DriveItemPath } from "../models/DriveItemPath.js";
import type { DriveItemRef } from "../models/DriveItemRef.js";
import type { DriveRef } from "../models/DriveRef.js";
import type { WorkbookRef } from "../models/WorkbookRef.js";
import createWorkbookInner from "../operations/workbook/createWorkbook.js";
import createWorkbookSession from "../operations/workbookSession/createWorkbookSession.js";
import { defaultDriveId, defaultSiteId } from "../services/configuration.js";

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

export async function createWorkbookWithSession(driveRef: DriveRef, itemPath: DriveItemPath): Promise<WorkbookRef> {
    const [item] = await execute(createWorkbookInner(driveRef, itemPath));


    //JSON.stringify(JSON.parse(atob(response.body)), null,2)
    
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