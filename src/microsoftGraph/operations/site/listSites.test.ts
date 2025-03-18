import { describe, expect, it } from "vitest";
import { executeSingle } from "../../graphApi.js";
import listSites from "./listSites.js";

describe("listSites", () => {
    it("can list all sites", async () => {
        const sites = await executeSingle(listSites());

        expect(sites.value).toBeInstanceOf(Array);
        expect(sites.value.length).toBeGreaterThan(0);
    });
});
