import { describe, expect, it } from "vitest";
import { getDefaultContextRef } from "../../services/context.ts";
import searchSites from "./searchSites.ts";

describe("searchSites", () => {
	it("can find sites matching the search keyword", async () => {
		const contextRef = getDefaultContextRef();
		const searchKeyword = "a";
		const result = await searchSites(contextRef, searchKeyword);

		expect(result.sites).toBeInstanceOf(Array);
		expect(result.sites.length).toBeGreaterThan(0);
	});

	it("handles search with '/' character", async () => {
		const contextRef = getDefaultContextRef();
		const searchKeyword = "/";
		const result = await searchSites(contextRef, searchKeyword);

		expect(result.sites).toBeInstanceOf(Array);
	});
});
