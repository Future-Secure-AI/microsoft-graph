import { operation } from "../../graphApi.js";
import type { Site } from "../../models/Dto.js";
import type { GraphOperation } from "../../models/GraphOperation.js";
import { generatePath } from "../../services/templatedPaths.js";

/** List sites that are available. @see https://learn.microsoft.com/en-us/graph/api/site-list */
export default function listSites(): GraphOperation<{ value: Site[] }> {
    return operation({
        method: "GET",
        path: generatePath("/sites", {}),
        headers: {},
        body: null,
    });
}
