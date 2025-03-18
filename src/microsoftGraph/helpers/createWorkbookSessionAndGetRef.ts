import { execute } from "../graphApi.js";
import type { DriveItemRef } from "../models/DriveItemRef.js";
import type { WorkbookRef } from "../models/WorkbookRef.js";
import createWorkbookSession from "../operations/workbookSession/createWorkbookSession.js";

export default async function createWorkbookSessionAndGetRef(itemRef: DriveItemRef): Promise<WorkbookRef> {
    const [session] = await execute(createWorkbookSession(itemRef));

    return {
        ...itemRef,
        sessionId: session.id,
    };
}
