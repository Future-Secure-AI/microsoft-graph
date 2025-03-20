import { operation } from "../../graphApi.ts";
import type { Site } from "../../models/Dto.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/** List sites that are available. @see https://learn.microsoft.com/en-us/graph/api/site-list */
export default function listSites(): GraphOperation<{ value: Site[] }> {
    return operation({
        method: "GET",
        path: generatePath("/sites", {}),
        headers: {},
        body: null,
    });
}
