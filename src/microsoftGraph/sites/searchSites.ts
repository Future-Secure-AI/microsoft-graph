import { generatePath, type GraphRequest } from "../api.js";
import type { Site } from "../models.js";

/** Find accessible sites that match keywords provided. @see https://learn.microsoft.com/en-us/graph/api/site-search */
export default function searchSites(search: string): GraphRequest<{ value: Site[] }> {
    return {
        method: "GET",
        path: generatePath("/sites?search={search}", { search }),
        headers: {},
        body: null
    };
}
