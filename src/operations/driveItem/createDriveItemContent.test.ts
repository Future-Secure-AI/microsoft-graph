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
		const smallChunkSize = 5; // Force multiple chunks

		const createdItem = await createDriveItemContent(driveRef, itemPath, contentStream, totalSize, "fail", smallChunkSize);

		try {
			expect(createdItem).toHaveProperty("id");
			expect(createdItem).toHaveProperty("name", fileName);

			const content = await streamToBuffer(await streamDriveItemContent(createdItem));
			expect(content.toString()).toEqual(sampleString);
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
