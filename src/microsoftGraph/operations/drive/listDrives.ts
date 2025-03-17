import type { GraphOperation } from "../../model/GraphOperation.js";
import type { GraphOptions } from "../../model/GraphOptions.js";
import type { DriveItem } from "../../model/models.js";
import type { SiteRef } from "../../model/SiteRef.js";
import generatePath from "../../utils/generatePath.js";

/** Retrieve the list of Drive resources available for a Site. @see https://learn.microsoft.com/en-us/graph/api/drive-list */
export default function listDrives(siteRef: SiteRef, opts?: GraphOptions): GraphOperation<{ value: DriveItem[] }> {
    return {
        method: "GET",
        path: generatePath("/sites/{site-id}/drives", siteRef),
        headers: {},
        body: null,
        dependsOn: opts?.dependsOn,
    };
}
