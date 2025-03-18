import type { Site } from "../../models/Dto.js";
import type { GraphOperation } from "../../models/GraphOperation.js";
import type { HostName } from "../../models/HostName.js";
import type { SiteName } from "../../models/SiteName.js";
import { generatePath } from "../../services/templatedPaths.js";

/** Get site by name. @see https://learn.microsoft.com/en-us/graph/api/site-getbypath */
export default function getSiteByName(hostName: HostName, siteName: SiteName): GraphOperation<Site> {
    return {
        method: "GET",
        path: generatePath("/sites/{host-name}:/{site-name}", { hostName, siteName }),
        headers: {},
        body: null,
    };
}
