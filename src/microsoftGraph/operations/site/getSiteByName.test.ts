import { describe, expect, it } from "vitest";
import type { HostName } from "../../models/HostName.js";
import type { SiteName } from "../../models/SiteName.js";
import { defaultSiteRef } from "../../services/configuration.js";
import getSite from "./getSite.js";
import getSiteByName from "./getSiteByName.js";

describe("getSiteByName", () => {
    it("can retrieve an existing site by name", async () => {
        const defaultSite = await getSite(defaultSiteRef);
        const hostName = new URL(defaultSite.webUrl ?? "").hostname as HostName; // Yeah, a little hacky, but in the context of this test it's fine
        const siteName = defaultSite.name as SiteName;
        const site = await getSiteByName(hostName, siteName);

        expect(site.id).toBe(defaultSite.id);
        expect(site.name).toBe(siteName);
    });

    it("throws an error when trying to retrieve a non-existent site by name", async () => {
        const nonExistentHostName = "non-existent-host-name" as HostName;
        const nonExistentSiteName = "non-existent-site-name" as SiteName;

        await expect(getSiteByName(nonExistentHostName, nonExistentSiteName)).rejects.toThrow();
    });
});
