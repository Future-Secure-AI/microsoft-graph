import { describe, expect, it } from "vitest";
import type { HostName } from "../../models/HostName.ts";
import type { SiteName } from "../../models/SiteName.ts";
import { getDefaultSiteRef } from "../../services/site.ts";
import getSite from "./getSite.ts";
import getSiteByName from "./getSiteByName.ts";

describe("getSiteByName", () => {
	it("can retrieve an existing site by name", async () => {
		const siteRef = getDefaultSiteRef();
		const site = await getSite(siteRef);

		const hostName = new URL(site.webUrl ?? "").hostname as HostName; // Yeah, a little hacky, but in the context of this test it's fine
		const siteName = site.name as SiteName;
		const siteByName = await getSiteByName(siteRef, hostName, siteName);

		expect(siteByName.id).toBe(site.id);
		expect(siteByName.name).toBe(siteName);
	});
});
