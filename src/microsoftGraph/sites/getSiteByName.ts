import { generatePath, type GraphOptions, type GraphRequest } from "../api.js";
import type { Site } from "../models.js";
import type { HostName } from "./HostName.js";
import type { SiteName } from "./SiteName.js";

/** Get site by name. @see https://learn.microsoft.com/en-us/graph/api/site-getbypath */
export default function getSiteByName(hostName: HostName, siteName: SiteName, opts?: GraphOptions): GraphRequest<Site> {
    return {
        method: "GET",
        path: generatePath("/sites/{host-name}:/{site-name}", { hostName, siteName }),
        headers: {},
        body: null,
        dependsOn: opts?.dependsOn,
    };
}
