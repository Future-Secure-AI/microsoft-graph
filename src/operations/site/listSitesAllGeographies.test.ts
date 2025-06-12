import { describe, expect, it } from "vitest";
import { getDefaultContextRef } from "../../services/context.ts";
import listSitesAllGeographies from "./listSitesAllGeographies.ts";

describe("listSitesAllGeographies", () => {
	it("can list all sites", async () => {
		const contextRef = getDefaultContextRef();
		const sites = await listSitesAllGeographies(contextRef);

		console.debug(
			"Sites:",
			sites.map((site) => [site.id, site.name]),
		);

		expect(sites).toBeInstanceOf(Array);
		expect(sites.length).toBeGreaterThan(0);
	});
});
