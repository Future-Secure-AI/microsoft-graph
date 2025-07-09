import { Readable } from "node:stream";
import { describe, expect, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import tryDeleteDriveItem from "../../tasks/tryDeleteDriveItem.ts";
import createDriveItemContent from "./createDriveItemContent.ts";
import streamDriveItemContent from "./streamDriveItemContent.ts";

const sampleContentType = "text/plain";
const sampleString = "Sample streamed content";

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

describe("createDriveItemContent", () => {
	it("creates a new drive item using a stream and verifies its content", async () => {
		const driveRef = getDefaultDriveRef();
		const itemPath = driveItemPath(generateTempFileName("txt"));
		const contentStream = stringToStream(sampleString);

		const createdItem = await createDriveItemContent(driveRef, itemPath, sampleContentType, contentStream);

		try {
			expect(createdItem).toHaveProperty("id");
			expect(createdItem).toHaveProperty("name", itemPath.split("/").pop());

			const content = await streamToBuffer(await streamDriveItemContent(createdItem));
			const originalArray = new TextEncoder().encode(sampleString);
			const retrievedArray = new Uint8Array(content);
			expect(retrievedArray).toEqual(originalArray);
		} finally {
			await tryDeleteDriveItem(createdItem);
		}
	});
});
