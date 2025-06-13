import { parse } from "csv-parse";
import { describe, expect, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import tryDeleteDriveItem from "../../tasks/tryDeleteDriveItem.ts";
import createDriveItem from "./createDriveItem.ts";
import streamDriveItemContent from "./streamDriveItemContent.ts";

const TEST_CSV_CONTENT = "col1,col2\nHello,World\nFoo,Bar";

function toArrayBuffer(str: string): ArrayBuffer {
	return new TextEncoder().encode(str).buffer;
}

describe("streamDriveItemContent", () => {
	it("can stream the content of an existing CSV file", { timeout: 20000 }, async () => {
		const csvPath = driveItemPath(generateTempFileName("csv"));
		const driveRef = getDefaultDriveRef();
		const csvBuffer = toArrayBuffer(TEST_CSV_CONTENT);
		const csvItem = await createDriveItem(driveRef, csvPath, "text/csv", csvBuffer);

		try {
			const stream = await streamDriveItemContent(csvItem);
			const rows: string[][] = [];
			await new Promise((resolve, reject) => {
				stream
					.pipe(parse())
					.on("data", (row) => rows.push(row))
					.on("end", resolve)
					.on("error", reject);
			});
			expect(rows.length).toBe(3);
			expect(rows[0]).toEqual(["col1", "col2"]);
			expect(rows[1]).toEqual(["Hello", "World"]);
			expect(rows[2]).toEqual(["Foo", "Bar"]);
		} finally {
			await tryDeleteDriveItem(csvItem);
		}
	});
});
