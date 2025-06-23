import { describe, expect, it } from "vitest";
import type { HostName } from "../../models/HostName.ts";
import type { SiteId, SiteName } from "../../models/Site.ts";
import { getDefaultContextRef } from "../../services/context.ts";
import getSiteByName from "./getSiteByName.ts";

describe("getSiteByName", () => {
	it("can retrieve an existing site by name", async () => {
		const contextRef = getDefaultContextRef();
		const hostName = "msftfuturesecureai.sharepoint.com" as HostName;
		const siteName = "FSAI-MQG" as SiteName;
		const siteId = "msftfuturesecureai.sharepoint.com,89cb90aa-7977-412d-8215-31c74db72d7b,910df34e-fa8e-473a-8606-b9b3386f0f01" as SiteId;

		const siteByName = await getSiteByName(contextRef, hostName, siteName);

		expect(siteByName.id).toBe(siteId);
		expect(siteByName.name).toBe(siteName);
	});
});
