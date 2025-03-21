import { describe, expect, it } from "vitest";
import listSites from "./listSites.ts";

describe("listSites", () => {
    it("can list all sites", async () => {
        const sites = await listSites();

        console.debug("Sites:", sites.map(site => [site.id, site.name]));

        expect(sites).toBeInstanceOf(Array);
        expect(sites.length).toBeGreaterThan(0);
    });
});
