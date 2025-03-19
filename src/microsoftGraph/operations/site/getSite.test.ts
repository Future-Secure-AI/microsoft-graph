import { describe, expect, it } from "vitest";
import type { SiteId } from "../../models/SiteId.js";
import { defaultSiteRef } from "../../services/configuration.js";
import { siteRef } from "../../services/site.js";
import getSite from "./getSite.js";

describe("getSite", () => {
    it("can retrieve an existing site", async () => {
        const site = await getSite(defaultSiteRef);

        expect(site.id).toBeDefined();
        expect(site.name).toBeDefined();
    });

    it("throws an error when trying to retrieve a non-existent site", async () => {
        const nonExistentSiteRef = siteRef("non-existent-site-id" as SiteId);

        await expect(getSite(nonExistentSiteRef)).rejects.toThrow();
    });
});
