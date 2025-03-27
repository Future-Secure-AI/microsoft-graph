import { describe, expect, it } from "vitest";
import listSites from "./listSites.ts";
import { getDefaultContextRef } from "../../services/context.ts";

describe("listSites", () => {
    it("can list all sites", async () => {
        const contextRef = getDefaultContextRef();
        const sites = await listSites(contextRef);

        console.debug("Sites:", sites.map(site => [site.id, site.name]));

        expect(sites).toBeInstanceOf(Array);
        expect(sites.length).toBeGreaterThan(0);
    });
});
