import { describe, expect, it } from "vitest";
import { executeSingle } from "../../graphApi.js";
import type { SiteId } from "../../models/SiteId.js";
import { defaultDriveRef, defaultSiteRef } from "../../services/configuration.js";
import { siteRef } from "../../services/site.js";
import getSite from "./getSite.js";

describe("getSite", () => {
    it("can retrieve an existing site", async () => {
        const site = await executeSingle(getSite(defaultSiteRef));

        expect(site.id).toBeDefined();
        expect(site.name).toBeDefined();
    });

    it("throws an error when trying to retrieve a non-existent site", async () => {
        const nonExistentSiteRef = siteRef(defaultDriveRef, "non-existent-site-id" as SiteId);

        await expect(executeSingle(getSite(nonExistentSiteRef))).rejects.toThrow();
    });
});
