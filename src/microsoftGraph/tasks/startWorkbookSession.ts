import type { DriveItemRef } from "../models/DriveItemRef.ts";
import type { WorkbookRef } from "../models/WorkbookRef.ts";
import createWorkbookSession from "../operations/workbookSession/createWorkbookSession.ts";

export default async function startWorkbookSession(itemRef: DriveItemRef): Promise<WorkbookRef> {
    const session = await createWorkbookSession(itemRef);

    return {
        ...itemRef,
        sessionId: session.id,
    };
}
