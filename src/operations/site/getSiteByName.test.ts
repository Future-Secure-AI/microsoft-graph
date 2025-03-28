import { describe, expect, it } from "vitest";
import type { HostName } from "../../models/HostName.ts";
import type { SiteName } from "../../models/SiteName.ts";
import { getDefaultSiteRef } from "../../services/site.ts";
import getSite from "./getSite.ts";
import getSiteByName from "./getSiteByName.ts";

describe("getSiteByName", () => {
	it("can retrieve an existing site by name", async () => {
		const defaultSiteRef = getDefaultSiteRef();
		const defaultSite = await getSite(defaultSiteRef);
		const hostName = new URL(defaultSite.webUrl ?? "").hostname as HostName; // Yeah, a little hacky, but in the context of this test it's fine
		const siteName = defaultSite.name as SiteName;
		const site = await getSiteByName(defaultSiteRef, hostName, siteName);

		expect(site.id).toBe(defaultSite.id);
		expect(site.name).toBe(siteName);
	});
});
