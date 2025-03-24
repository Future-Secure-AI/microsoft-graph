
import type { DriveItem } from "@microsoft/microsoft-graph-types";
import { operation } from "../../graphApi.ts";
import type { DriveId } from "../../models/DriveId.ts";
import type { DriveRef } from "../../models/DriveRef.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { SiteRef } from "../../models/SiteRef.ts";
import { driveRef } from "../../services/drive.ts";
import { generatePath } from "../../services/templatedPaths.ts";
import { getDefaultSiteRef } from "../../services/site.ts";

/** Retrieve the list of Drive resources available for a Site. @see https://learn.microsoft.com/en-us/graph/api/drive-list */
export default function listDrives(siteRef: SiteRef = getDefaultSiteRef()): GraphOperation<(DriveItem & DriveRef)[]> {
    return operation({
        method: "GET",
        path: generatePath("/sites/{site-id}/drives", siteRef),
        headers: {},
        body: null,
        responseTransform: response => {
            const list = response as { value: DriveItem[]; };
            return list.value.map(drive => {
                const ref = driveRef(siteRef, drive.id as DriveId);
                return {
                    ...drive,
                    ...ref
                };
            });
        }
    });
}
