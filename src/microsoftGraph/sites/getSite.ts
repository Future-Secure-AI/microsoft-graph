import { generatePath, type GraphRequest } from "../api.js";
import type { Site } from "../models.js";
import type { SiteRef } from "./SiteRef.js";

/** Retrieve properties for a site resource. @see https://learn.microsoft.com/en-us/graph/api/site-get */
export default function getSite(siteRef: SiteRef): GraphRequest<Site> {
    return {
        method: "GET",
        path: generatePath("/sites/{site-id}", siteRef),
        headers: {},
        body: null
    };
}
