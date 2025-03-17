import type { Site } from "../../models/Dto.js";
import type { GraphOperation } from "../../models/GraphOperation.js";
import type { GraphOptions } from "../../models/GraphOptions.js";
import generatePath from "../../services/generatePath.js";

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
