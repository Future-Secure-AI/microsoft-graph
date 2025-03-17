import type { GraphOptions } from "../GraphOptions.js";
import type { GraphRequest } from "../GraphRequest.js";
import type { Site } from "../models.js";
import generatePath from "../utils/generatePath.js";
import type { SiteRef } from "./SiteRef.js";

/** Retrieve properties for a site resource. @see https://learn.microsoft.com/en-us/graph/api/site-get */
export default function getSite(siteRef: SiteRef, opts?: GraphOptions): GraphRequest<Site> {
    return {
        method: "GET",
        path: generatePath("/sites/{site-id}", siteRef),
        headers: {},
        body: null,
        dependsOn: opts?.dependsOn,
    };
}
