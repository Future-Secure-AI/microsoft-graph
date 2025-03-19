import { operation } from "../../graphApi.js";
import type { Site } from "../../models/Dto.js";
import type { GraphOperation } from "../../models/GraphOperation.js";
import { generatePath } from "../../services/templatedPaths.js";

/** Find accessible sites that match keywords provided. @see https://learn.microsoft.com/en-us/graph/api/site-search */
export default function searchSites(search: string): GraphOperation<{ value: Site[] }> {
    return operation({
        method: "GET",
        path: generatePath("/sites?search={search}", { search }),
        headers: {},
        body: null,
    });
}
