import { describe, expect, it } from "vitest";
import { getDefaultContextRef } from "../services/context.ts";
import getSiteByUrl from "./getSiteByUrl.ts";

describe("getSiteByUrl", () => {
	it("should return the correct drive for a valid SharePoint URL", async () => {
		const url = "https://msftfuturesecureai.sharepoint.com/sites/FSAI-MQG/PL/Forms/AllItems.aspx?viewid=075ae863%2Ddee7%2D4407%2D8411%2Dbb2a13584e2c";
		const contextRef = getDefaultContextRef();
		const site = await getSiteByUrl(contextRef, url);
		expect(site).toBeDefined();
		expect(site.name).toBe("FSAI-MQG");
	});
});
