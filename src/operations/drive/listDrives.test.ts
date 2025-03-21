import { describe, expect, it } from "vitest";
import { defaultSiteRef } from "../../services/configuration.ts";
import listDrives from "./listDrives.ts";

describe("listDrives", () => {
    it("can listDrives", async () => {
        const drives = await listDrives(defaultSiteRef);

        console.debug("Drives:", drives.map((drive) => [drive.id, drive.name]));
        expect(drives.length).toBeGreaterThan(0);
    });
});