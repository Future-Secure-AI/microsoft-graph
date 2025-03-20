import { operation } from "../../graphApi.ts";
import type { Site } from "../../models/Dto.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { HostName } from "../../models/HostName.ts";
import type { SiteName } from "../../models/SiteName.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/** Get site by name. @see https://learn.microsoft.com/en-us/graph/api/site-getbypath */
export default function getSiteByName(hostName: HostName, siteName: SiteName): GraphOperation<Site> {
    return operation({
        method: "GET",
        path: generatePath("/sites/{host-name}:/sites/{site-name}", { hostName, siteName }),
        headers: {},
        body: null,
    });
}
