import { execute } from "../graphApi.js";
import type { DriveItemId } from "../models/DriveItemId.js";
import type { DriveItemRef } from "../models/DriveItemRef.js";
import type { WorkbookRef } from "../models/WorkbookRef.js";
import createWorkbookSession from "../operations/workbookSession/createWorkbookSession.js";
import { defaultDriveId, defaultSiteId } from "../services/configuration.js";

/** Opinionated convenience helper to start a workbook session. Includes starting a session. */
export async function openWorkbook(workbookRef: WorkbookRef): Promise<WorkbookRef> {
    const [session] = await execute(createWorkbookSession(workbookRef));

    return {
        ...workbookRef,
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