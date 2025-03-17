import type { Site } from "../../models/Dto.js";
import type { GraphOperation } from "../../models/GraphOperation.js";
import type { GraphOptions } from "../../models/GraphOptions.js";
import { generatePath } from "../../services/templatedPaths.js";

/** Find accessible sites that match keywords provided. @see https://learn.microsoft.com/en-us/graph/api/site-search */
export default function searchSites(search: string, opts?: GraphOptions): GraphOperation<{ value: Site[] }> {
    return {
        method: "GET",
        path: generatePath("/sites?search={search}", { search }),
        headers: {},
        body: null,
        dependsOn: opts?.dependsOn,
    };
}
