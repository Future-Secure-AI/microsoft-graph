import type { GraphOperation } from "../../model/GraphOperation.js";
import type { GraphOptions } from "../../model/GraphOptions.js";
import type { Site } from "../../model/models.js";
import generatePath from "../../utils/generatePath.js";

/** List sites that are available. @see https://learn.microsoft.com/en-us/graph/api/site-list */
export default function listSites(opts?: GraphOptions): GraphOperation<{ value: Site[] }> {
    return {
        method: "GET",
        path: generatePath("/sites", {}),
        headers: {},
        body: null,
        dependsOn: opts?.dependsOn,
    };
}
