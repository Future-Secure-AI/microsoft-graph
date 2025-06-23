import { describe, expect, it } from "vitest";
import { getDefaultContextRef } from "../services/context.ts";
import getDriveFromUrl from "./getDriveFromUrl.ts";

describe("getDriveFromUrl", () => {
	it("should return the correct drive for a valid SharePoint URL", async () => {
		const url = "https://msftfuturesecureai.sharepoint.com/sites/FSAI-MQG/PL/Forms/AllItems.aspx?viewid=075ae863%2Ddee7%2D4407%2D8411%2Dbb2a13584e2c";
		const contextRef = getDefaultContextRef();
		const drive = await getDriveFromUrl(contextRef, url);
		expect(drive).toBeDefined();
		expect(drive.name).toBe("P&L");
		expect(drive.id).toBe("b!qpDLiXd5LUGCFTHHTbcte07zDZGO-jpHhga5szhvDwEvhFVvV24OSrAv5WljW1aA");
	});
});
