import type { DriveItemRef } from "../models/DriveItemRef.js";
import type { WorkbookRef } from "../models/WorkbookRef.js";
import createWorkbookSession from "../operations/workbookSession/createWorkbookSession.js";

export default async function startWorkbookSession(itemRef: DriveItemRef): Promise<WorkbookRef> {
    const session = await createWorkbookSession(itemRef);

    return {
        ...itemRef,
        sessionId: session.id,
    };
}
