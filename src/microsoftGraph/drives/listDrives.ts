import type { GraphOptions } from "../GraphOptions.js";
import type { GraphRequest } from "../GraphRequest.js";
import type { DriveItem } from "../models.js";
import type { SiteRef } from "../sites/SiteRef.js";
import generatePath from "../utils/generatePath.js";

/** Retrieve the list of Drive resources available for a Site. @see https://learn.microsoft.com/en-us/graph/api/drive-list */
export default function listDrives(siteRef: SiteRef, opts?: GraphOptions): GraphRequest<{ value: DriveItem[] }> {
    return {
        method: "GET",
        path: generatePath("/sites/{site-id}/drives", siteRef),
        headers: {},
        body: null,
        dependsOn: opts?.dependsOn,
    };
}
