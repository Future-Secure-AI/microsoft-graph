import type { GraphOptions } from "../GraphOptions.js";
import type { GraphRequest } from "../GraphRequest.js";
import type { Site } from "../models.js";
import generatePath from "../utils/generatePath.js";

/** Find accessible sites that match keywords provided. @see https://learn.microsoft.com/en-us/graph/api/site-search */
export default function searchSites(search: string, opts?: GraphOptions): GraphRequest<{ value: Site[] }> {
    return {
        method: "GET",
        path: generatePath("/sites?search={search}", { search }),
        headers: {},
        body: null,
        dependsOn: opts?.dependsOn,
    };
}
