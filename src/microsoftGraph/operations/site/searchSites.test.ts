import { describe, expect, it } from "vitest";
import searchSites from "./searchSites.ts";

describe("searchSites", () => {
    it("can find sites matching the search keyword", async () => {
        const searchKeyword = "a";
        const result = await searchSites(searchKeyword);

        expect(result.value).toBeInstanceOf(Array);
        expect(result.value.length).toBeGreaterThan(0);
    });

    it("returns an empty array when no sites match the search keyword", async () => {
        const searchKeyword = "non-existent-keyword";
        const result = await searchSites(searchKeyword);

        expect(result.value).toBeInstanceOf(Array);
        expect(result.value.length).toBe(0);
    });

    it("handles search with '/' character", async () => {
        const searchKeyword = "/";
        const result = await searchSites(searchKeyword);

        expect(result.value).toBeInstanceOf(Array);
    });
});
