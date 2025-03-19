import { describe, expect, it } from "vitest";
import { defaultSiteRef } from "../../services/configuration.js";
import listDrives from "./listDrives.js";

describe("listDrives", () => {
    it("can listDrives", async () => {
        const drives = await listDrives(defaultSiteRef);

        console.debug("Drives:", drives.value.map((drive) => [drive.id, drive.name]));
        expect(drives.value.length).toBeGreaterThan(0);
    });
});