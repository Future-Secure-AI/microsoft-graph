import { describe, expect, it } from "vitest";
import listSites from "./listSites.ts";

describe("listSites", () => {
    it("can list all sites", async () => {
        const sites = await listSites();

        console.debug("Sites:", sites.value.map((site) => [site.id, site.name]));

        expect(sites.value).toBeInstanceOf(Array);
        expect(sites.value.length).toBeGreaterThan(0);
    });
});
