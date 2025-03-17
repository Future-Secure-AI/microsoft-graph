import type { GraphOperation } from "../../model/GraphOperation.js";
import type { GraphOptions } from "../../model/GraphOptions.js";
import type { HostName } from "../../model/HostName.js";
import type { Site } from "../../model/models.js";
import type { SiteName } from "../../model/SiteName.js";
import generatePath from "../../utils/generatePath.js";

/** Get site by name. @see https://learn.microsoft.com/en-us/graph/api/site-getbypath */
export default function getSiteByName(hostName: HostName, siteName: SiteName, opts?: GraphOptions): GraphOperation<Site> {
    return {
        method: "GET",
        path: generatePath("/sites/{host-name}:/{site-name}", { hostName, siteName }),
        headers: {},
        body: null,
        dependsOn: opts?.dependsOn,
    };
}
