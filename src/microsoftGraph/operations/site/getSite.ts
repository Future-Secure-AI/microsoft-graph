import type { Site } from "../../models/Dto.js";
import type { GraphOperation } from "../../models/GraphOperation.js";
import type { SiteRef } from "../../models/SiteRef.js";
import { generatePath } from "../../services/templatedPaths.js";

/** Retrieve properties for a site resource. @see https://learn.microsoft.com/en-us/graph/api/site-get */
export default function getSite(siteRef: SiteRef): GraphOperation<Site> {
    return {
        method: "GET",
        path: generatePath("/sites/{site-id}", siteRef),
        headers: {},
        body: null,
    };
}
