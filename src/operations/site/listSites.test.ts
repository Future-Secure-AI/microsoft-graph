import { describe, expect, it } from "vitest";
import { getDefaultContextRef } from "../../services/context.ts";
import listSites from "./listSites.ts";

describe("listSites", () => {
	it("can list all sites", async () => {
		const contextRef = getDefaultContextRef();
		const { sites } = await listSites(contextRef);

		console.debug(
			"Sites:",
			sites.map((x) => x.name),
		);

		expect(sites.length).toBeGreaterThan(0);
	});
});
