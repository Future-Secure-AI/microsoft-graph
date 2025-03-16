import { generatePath, type GraphRequest } from "../api.js";
import type { Site } from "../models.js";

/** List sites that are available. @see https://learn.microsoft.com/en-us/graph/api/site-list */
export default function listSites(): GraphRequest<{ value: Site[] }> {
    return {
        method: "GET",
        path: generatePath("/sites", {}),
        headers: {},
        body: null
    };
}
