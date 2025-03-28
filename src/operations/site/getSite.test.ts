import { describe, expect, it } from "vitest";
import { getDefaultSiteRef } from "../../services/site.ts";
import getSite from "./getSite.ts";

describe("getSite", () => {
	it("can retrieve an existing site", async () => {
		const defaultSiteRef = getDefaultSiteRef();

		const site = await getSite(defaultSiteRef);

		expect(site.id).toBeDefined();
		expect(site.name).toBeDefined();
	});
});
