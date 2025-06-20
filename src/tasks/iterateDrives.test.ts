import { describe, expect, it } from "vitest";
import { iterateToArray } from "../services/iteration.ts";
import { getDefaultSiteRef } from "../services/site.ts";
import iterateDrives from "./iterateDrives.ts";

describe("iterateDrives", () => {
	it("can iterate all drives in a site", async () => {
		const siteRef = getDefaultSiteRef();
		const drives = await iterateToArray(iterateDrives(siteRef));

		console.debug(
			"Drives:",
			drives.map((x) => x.name),
		);
		expect(drives.length).toBeGreaterThan(0);
	});

	it("can iterate all drives in a site with small pages", async () => {
		const siteRef = getDefaultSiteRef();
		const drives = await iterateToArray(iterateDrives(siteRef, 1));

		console.debug(
			"Drives:",
			drives.map((x) => x.name),
		);
		expect(drives.length).toBeGreaterThan(0);
	});
});
