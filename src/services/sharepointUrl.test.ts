import { describe, expect, it } from "vitest";
import { parseSharepointUrl } from "./sharepointUrl.ts";

describe("parseSharepointUrl", () => {
	it.each([
		[
			"https://hostname.sharepoint.com/sites/sitename/_layouts/15/doc.aspx?sourcedoc={500ff055-1e0f-4c2e-8b32-d167fba4778b}&action=edit",
			{
				hostName: "hostname.sharepoint.com",
				siteName: "sitename",
			},
		],
		[
			"https://hostname.sharepoint.com/:x:/r/sites/sitename/_layouts/15/Doc.aspx?sourcedoc=%7B500FF055-1E0F-4C2E-8B32-D167FBA4778B%7D&file=Book.xlsx&action=default&mobileredirect=true",
			{
				hostName: "hostname.sharepoint.com",
				siteName: "sitename",
			},
		],
		[
			"https://hostname.sharepoint.com/:x:/r/sites/sitename/_layouts/15/Doc.aspx?sourcedoc=%7B418801C2-AF81-44F9-AD17-324A973AA6AF%7D&file=a.xlsx&action=default&mobileredirect=true",
			{
				hostName: "hostname.sharepoint.com",
				siteName: "sitename",
			},
		],
		[
			"https://hostname.sharepoint.com/sites/sitename/drivename/Forms/AllItems.aspx?viewid=075ae863%2Ddee7%2D4407%2D8411%2Dbb2a13584e2c",
			{
				hostName: "hostname.sharepoint.com",
				siteName: "sitename",
			},
		],
		[
			"https://hostname.sharepoint.com/sites/With%20Space/drivename/Forms/AllItems.aspx?viewid=075ae863%2Ddee7%2D4407%2D8411%2Dbb2a13584e2c",
			{
				hostName: "hostname.sharepoint.com",
				siteName: "With Space",
			},
		],
	])("parses %s", (url, expected) => {
		expect(parseSharepointUrl(url)).toEqual(expected);
	});

	it("returns all null for non-SharePoint URL", () => {
		const result = parseSharepointUrl("https://example.com/foo/bar");
		expect(result).toEqual({
			hostName: null,
			siteName: null,
		});
	});

	it("returns all null for gibberish string", () => {
		const result = parseSharepointUrl("not a url at all");
		expect(result).toEqual({
			hostName: null,
			siteName: null,
		});
	});

	it("returns nulls for SharePoint URL missing site name", () => {
		const result = parseSharepointUrl("https://hostname.sharepoint.com/sites/");
		expect(result).toEqual({
			hostName: "hostname.sharepoint.com",
			siteName: null,
		});
	});

	it("returns nulls for SharePoint URL missing all path segments", () => {
		const result = parseSharepointUrl("https://hostname.sharepoint.com/");
		expect(result).toEqual({
			hostName: "hostname.sharepoint.com",
			siteName: null,
		});
	});
});
