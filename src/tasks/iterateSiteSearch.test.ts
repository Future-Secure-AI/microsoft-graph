import { describe, expect, it } from "vitest";
import { getDefaultContextRef } from "../services/context.ts";
import { iterateToArray } from "../services/iteration.ts";
import iterateSiteSearch from "./iterateSiteSearch.ts";

describe("iterateSiteSearch", () => {
	it("can iterate all sites matching a search keyword", async () => {
		const contextRef = getDefaultContextRef();
		const searchKeyword = "a";
		const sites = await iterateToArray(iterateSiteSearch(contextRef, searchKeyword));

		console.debug(
			"Sites:",
			sites.map((x) => x.name),
		);
		expect(sites.length).toBeGreaterThan(0);
	});

	it("handles search with '/' character", async () => {
		const contextRef = getDefaultContextRef();
		const searchKeyword = "/";
		const sites = await iterateToArray(iterateSiteSearch(contextRef, searchKeyword));
		expect(sites).toBeInstanceOf(Array);
	});
});
