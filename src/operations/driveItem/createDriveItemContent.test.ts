import { Readable } from "node:stream";
import { describe, expect, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import tryDeleteDriveItem from "../../tasks/tryDeleteDriveItem.ts";
import createDriveItemContent from "./createDriveItemContent.ts";
import streamDriveItemContent from "./streamDriveItemContent.ts";

const sampleString = "Sample streamed content";

describe("createDriveItemContent", () => {
	it("creates a new drive item using a stream and verifies its content", async () => {
		const driveRef = getDefaultDriveRef();
		const fileName = generateTempFileName("txt");
		const itemPath = driveItemPath(fileName);
		const contentStream = stringToStream(sampleString);
		const totalSize = Buffer.byteLength(sampleString);

		const createdItem = await createDriveItemContent(driveRef, itemPath, contentStream, totalSize);

		try {
			expect(createdItem).toHaveProperty("id");
			expect(createdItem).toHaveProperty("name", fileName);

			const content = await streamToBuffer(await streamDriveItemContent(createdItem));
			expect(content.toString()).toEqual(sampleString);
		} finally {
			await tryDeleteDriveItem(createdItem);
		}
	});

	it("uploads content in multiple chunks", async () => {
		const driveRef = getDefaultDriveRef();
		const fileName = generateTempFileName("txt");
		const itemPath = driveItemPath(fileName);
		const contentStream = stringToStream(sampleString);
		const totalSize = Buffer.byteLength(sampleString);

		const createdItem = await createDriveItemContent(driveRef, itemPath, contentStream, totalSize, { chunkSize: 5 });

		try {
			expect(createdItem).toHaveProperty("id");
			expect(createdItem).toHaveProperty("name", fileName);

			const content = await streamToBuffer(await streamDriveItemContent(createdItem));
			expect(content.toString()).toEqual(sampleString);
		} finally {
			await tryDeleteDriveItem(createdItem);
		}
	});

	it("calls progress callback with increasing values", async () => {
		const driveRef = getDefaultDriveRef();
		const fileName = generateTempFileName("txt");
		const itemPath = driveItemPath(fileName);
		const contentStream = stringToStream(sampleString);
		const totalSize = Buffer.byteLength(sampleString);
		const progressCalls: number[] = [];

		const createdItem = await createDriveItemContent(driveRef, itemPath, contentStream, totalSize, { chunkSize: 5, progress: (pct: number) => progressCalls.push(pct) });

		try {
			expect(createdItem).toHaveProperty("id");
			expect(progressCalls.length).toBeGreaterThan(0);
			// Should be increasing and last value should be 100 (or very close)
			for (let i = 1; i < progressCalls.length; ++i) {
				expect(progressCalls[i]).toBeGreaterThanOrEqual(progressCalls[i - 1]);
			}
			expect(progressCalls[progressCalls.length - 1]).toBeGreaterThanOrEqual(99); // allow rounding
		} finally {
			await tryDeleteDriveItem(createdItem);
		}
	});
});

function stringToStream(str: string): NodeJS.ReadableStream {
	return Readable.from([str]);
}
async function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
	const chunks: Uint8Array[] = [];
	await new Promise<void>((resolve, reject) => {
		stream.on("data", (chunk) => chunks.push(chunk));
		stream.on("end", resolve);
		stream.on("error", reject);
	});
	return Buffer.concat(chunks);
}
