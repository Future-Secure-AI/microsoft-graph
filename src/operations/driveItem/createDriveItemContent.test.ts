import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import tryDeleteDriveItem from "../../tasks/tryDeleteDriveItem.ts";
import createDriveItemContent from "./createDriveItemContent.ts";
import streamDriveItemContent from "./streamDriveItemContent.ts";

describe("createDriveItemContent (file-based)", () => {
	it("uploads a 1KB file with default chunk size", async () => {
		const driveRef = getDefaultDriveRef();

		const fileSize = 1024;
		const filePath = await createTempFile(fileSize);
		const fileStream = fs.createReadStream(filePath);

		const itemName = path.basename(filePath);
		const itemPath = driveItemPath(itemName);

		const item = await createDriveItemContent(driveRef, itemPath, fileStream, fileSize);

		try {
			expect(item).toHaveProperty("id");
			expect(item).toHaveProperty("name", itemName);

			const downloadedBuffer = await streamToBuffer(await streamDriveItemContent(item));
			const originalBuffer = await fs.promises.readFile(filePath);
			expect(downloadedBuffer.equals(originalBuffer)).toBe(true);
		} finally {
			await tryDeleteDriveItem(item);
			await fs.promises.unlink(filePath);
		}
	});

	it("uploads a 1MB file with minimal chunk size", async () => {
		const driveRef = getDefaultDriveRef();

		const fileSize = 1024 * 1024; // 1MB
		const filePath = await createTempFile(fileSize);
		const fileStream = fs.createReadStream(filePath);

		const itemName = path.basename(filePath);
		const itemPath = driveItemPath(itemName);

		const chunkSize = 320 * 1024;
		const progressCalls: number[] = [];

		const createdItem = await createDriveItemContent(driveRef, itemPath, fileStream, fileSize, { maxChunkSize: chunkSize, progress: (pct) => progressCalls.push(pct) });

		try {
			expect(createdItem).toHaveProperty("id");
			expect(createdItem).toHaveProperty("name", itemName);

			const downloadedBuffer = await streamToBuffer(await streamDriveItemContent(createdItem));
			const originalBuffer = await fs.promises.readFile(filePath);
			expect(downloadedBuffer.equals(originalBuffer)).toBe(true);

			expect(progressCalls.length).toBeGreaterThan(0);
			for (let i = 1; i < progressCalls.length; ++i) {
				expect(progressCalls[i]).toBeGreaterThanOrEqual(progressCalls[i - 1]);
			}
			expect(progressCalls[progressCalls.length - 1]).toBeGreaterThanOrEqual(99);
		} finally {
			await tryDeleteDriveItem(createdItem);
			await fs.promises.unlink(filePath);
		}
	});

	it("uploads a 10MB file with default chunk size", async () => {
		const driveRef = getDefaultDriveRef();

		const fileSize = 1024 * 1024 * 10; // 10MB
		const filePath = await createTempFile(fileSize);
		const fileStream = fs.createReadStream(filePath);

		const itemName = path.basename(filePath);
		const itemPath = driveItemPath(itemName);

		const item = await createDriveItemContent(driveRef, itemPath, fileStream, fileSize);

		try {
			expect(item).toHaveProperty("id");
			expect(item).toHaveProperty("name", itemName);

			const downloadedBuffer = await streamToBuffer(await streamDriveItemContent(item));
			const originalBuffer = await fs.promises.readFile(filePath);
			expect(downloadedBuffer.equals(originalBuffer)).toBe(true);
		} finally {
			await tryDeleteDriveItem(item);
			await fs.promises.unlink(filePath);
		}
	});
});

async function createTempFile(size: number): Promise<string> {
	const tmpDir = os.tmpdir();
	const fileName = path.join(tmpDir, generateTempFileName("bin"));
	const fd = await fs.promises.open(fileName, "w");
	const chunkSize = Math.min(1024 * 1024, size); // up to 1MB at a time
	let written = 0;
	while (written < size) {
		const toWrite = Math.min(chunkSize, size - written);
		const chunk = crypto.randomBytes(toWrite);
		await fd.write(chunk, 0, toWrite);
		written += toWrite;
	}
	await fd.close();
	return fileName;
}

async function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
	const chunks: Buffer[] = [];
	return new Promise((resolve, reject) => {
		stream.on("data", (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
		stream.on("end", () => resolve(Buffer.concat(chunks)));
		stream.on("error", reject);
	});
}
