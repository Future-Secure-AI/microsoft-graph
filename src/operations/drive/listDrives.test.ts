import { describe, expect, it } from "vitest";
import { getDefaultSiteRef } from "../../services/site.ts";
import listDrives from "./listDrives.ts";

describe("listDrives", () => {
    it("can listDrives", async () => {
        const defaultSiteRef = getDefaultSiteRef();
        const drives = await listDrives(defaultSiteRef);

        console.debug("Drives:", drives.map((drive) => [drive.id, drive.name]));
        expect(drives.length).toBeGreaterThan(0);
    });
});