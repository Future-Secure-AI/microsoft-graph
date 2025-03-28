import { describe, expect, it } from "vitest";
import { parseSharepointUrl } from "./sharepointUrl.ts";

describe("parseSharepointUrl", () => {
	it.each([
		[
			"https://msftfuturesecureai.sharepoint.com/sites/FSAI-MQG/_layouts/15/doc.aspx?sourcedoc={500ff055-1e0f-4c2e-8b32-d167fba4778b}&action=edit",
			{
				hostName: "msftfuturesecureai.sharepoint.com",
				siteName: "FSAI-MQG",
				itemId: "500FF055-1E0F-4C2E-8B32-D167FBA4778B",
			},
		],
		[
			"https://msftfuturesecureai.sharepoint.com/:x:/r/sites/FSAI-MQG/_layouts/15/Doc.aspx?sourcedoc=%7B500FF055-1E0F-4C2E-8B32-D167FBA4778B%7D&file=Book.xlsx&action=default&mobileredirect=true",
			{
				hostName: "msftfuturesecureai.sharepoint.com",
				siteName: "FSAI-MQG",
				itemId: "500FF055-1E0F-4C2E-8B32-D167FBA4778B",
			},
		],
		[
			"https://msftfuturesecureai.sharepoint.com/:x:/r/sites/FSAI-MQG/_layouts/15/Doc.aspx?sourcedoc=%7B418801C2-AF81-44F9-AD17-324A973AA6AF%7D&file=a.xlsx&action=default&mobileredirect=true",
			{
				hostName: "msftfuturesecureai.sharepoint.com",
				siteName: "FSAI-MQG",
				itemId: "418801C2-AF81-44F9-AD17-324A973AA6AF",
			},
		],
	])("parses %s", (url, expected) => {
		expect(parseSharepointUrl(new URL(url))).toEqual(expected);
	});
});
