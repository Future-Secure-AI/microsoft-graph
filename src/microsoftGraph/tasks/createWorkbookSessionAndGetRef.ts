import { executeSingle } from "../graphApi.js";
import type { DriveItemRef } from "../models/DriveItemRef.js";
import type { WorkbookRef } from "../models/WorkbookRef.js";
import createWorkbookSession from "../operations/workbookSession/createWorkbookSession.js";

export default async function startWorkbookSessionAndGetRef(itemRef: DriveItemRef): Promise<WorkbookRef> {
    const session = await executeSingle(createWorkbookSession(itemRef));

    return {
        ...itemRef,
        sessionId: session.id,
    };
}
