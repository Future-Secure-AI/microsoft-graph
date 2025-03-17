import type { Site } from "../../model/Dto.js";
import type { GraphOperation } from "../../model/GraphOperation.js";
import type { GraphOptions } from "../../model/GraphOptions.js";
import generatePath from "../../utils/generatePath.js";

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
