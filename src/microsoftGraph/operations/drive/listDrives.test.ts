import { describe, expect, it } from "vitest";
import { executeSingle } from "../../graphApi.js";
import { defaultSiteRef } from "../../services/configuration.js";
import listDrives from "./listDrives.js";

describe("listDrives", () => {
    it("can listDrives", async () => {
        const drives = await executeSingle(listDrives(defaultSiteRef));

        console.debug("Drives:", drives.value.map((drive) => drive.name));
        expect(drives.value.length).toBeGreaterThan(0);
    });
});