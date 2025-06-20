import { describe, expect, it } from "vitest";
import { getDefaultContextRef } from "../services/context.ts";
import { iterateToArray } from "../services/iteration.ts";
import iterateSites from "./iterateSites.ts";

describe("iterateSites", () => {
	it("can iterate all sites", async () => {
		const contextRef = getDefaultContextRef();
		const sites = await iterateToArray(iterateSites(contextRef));

		console.debug(
			"Sites:",
			sites.map((x) => x.name),
		);
		expect(sites.length).toBeGreaterThan(0);
	});
});
