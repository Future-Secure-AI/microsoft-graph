import generatePath from "../generatePath.js";
import type { GraphOptions } from "../GraphOptions.js";
import type { GraphRequest } from "../GraphRequest.js";
import type { Site } from "../models.js";

/** List sites that are available. @see https://learn.microsoft.com/en-us/graph/api/site-list */
export default function listSites(opts?: GraphOptions): GraphRequest<{ value: Site[] }> {
    return {
        method: "GET",
        path: generatePath("/sites", {}),
        headers: {},
        body: null,
        dependsOn: opts?.dependsOn,
    };
}
