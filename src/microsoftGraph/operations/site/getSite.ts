import type { GraphOperation } from "../../model/GraphOperation.js";
import type { GraphOptions } from "../../model/GraphOptions.js";
import type { Site } from "../../model/models.js";
import type { SiteRef } from "../../model/SiteRef.js";
import generatePath from "../../utils/generatePath.js";

/** Retrieve properties for a site resource. @see https://learn.microsoft.com/en-us/graph/api/site-get */
export default function getSite(siteRef: SiteRef, opts?: GraphOptions): GraphOperation<Site> {
    return {
        method: "GET",
        path: generatePath("/sites/{site-id}", siteRef),
        headers: {},
        body: null,
        dependsOn: opts?.dependsOn,
    };
}
