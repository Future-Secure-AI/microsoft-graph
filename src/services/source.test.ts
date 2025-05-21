import { describe, expect, it } from "vitest";
import NotFoundError from "../errors/NotFoundError.ts";
import type { ContextId } from "../models/ContextId.ts";
import type { DriveId } from "../models/DriveId.ts";
import type { DriveItemId } from "../models/DriveItemId.ts";
import type { SiteId } from "../models/SiteId.ts";
import type { WorkbookWorksheetId } from "../models/WorkbookWorksheetId.ts";
import type { WorkbookWorksheetRef } from "../models/WorkbookWorksheetRef.ts";
import createWorkbook from "../operations/workbook/createWorkbook.ts";
import getWorkbookWorksheetRange from "../operations/workbookRange/getWorkbookWorksheetRange.ts";
import updateWorkbookRange from "../operations/workbookRange/updateWorkbookRange.ts";
import tryDeleteDriveItem from "../tasks/tryDeleteDriveItem.ts";
import { getDefaultDriveRef } from "./drive.ts";
import { driveItemPath } from "./driveItem.ts";
import { defineSource, generalNumberFormat, readAllItems, readItemByIndex, replaceItem, setRecords, type ColumnHeading, type Source, type SourceIndex, type SourceRow } from "./source.ts";
import { generateTempFileName } from "./temporaryFiles.ts";
import { createWorkbookRangeRef } from "./workbookRange.ts";
import { createWorkbookWorksheetRef, defaultWorkbookWorksheetId } from "./workbookWorksheet.ts";

type TestRecord = {
	id: number;
	name: string;
	active: boolean;
};

const idAttribute = "id" as ColumnHeading;
const nameAttribute = "name" as ColumnHeading;
const activeAttribute = "active" as ColumnHeading;

const testRecord1: TestRecord = { id: 1, name: "Item 1", active: true };
const testRecord2: TestRecord = { id: 2, name: "Item 2", active: false };
const testRecord3: TestRecord = { id: 3, name: "Item 3", active: true };
const testRecord4: TestRecord = { id: 4, name: "New Item 4", active: true };
const testRecord5: TestRecord = { id: 5, name: "New Item 5", active: false };
const testRecord6: TestRecord = { id: 6, name: "New Item 6", active: true };

const worksheetData = [
	[idAttribute, nameAttribute, activeAttribute], // Header row
	[testRecord1.id, testRecord1.name, testRecord1.active],
	[testRecord2.id, testRecord2.name, testRecord2.active],
	[testRecord3.id, testRecord3.name, testRecord3.active],
];

const decode = (row: SourceRow): TestRecord => {
	return {
		id: Number(row[idAttribute].value),
		name: String(row[nameAttribute].value),
		active: Boolean(row[activeAttribute].value),
	};
};

const encode = (record: TestRecord): SourceRow => {
	return {
		[idAttribute]: {
			text: record.id.toString(),
			value: record.id,
			numberFormat: generalNumberFormat,
		},
		[nameAttribute]: {
			text: record.name,
			value: record.name,
			numberFormat: generalNumberFormat,
		},
		[activeAttribute]: {
			text: record.active.toString(),
			value: record.active,
			numberFormat: generalNumberFormat,
		},
	};
};

async function setup(): Promise<Source<TestRecord>> {
	const workbookName = generateTempFileName("xlsx");
	const workbookPath = driveItemPath(workbookName);
	const driveRef = getDefaultDriveRef();
	const workbook = await createWorkbook(driveRef, workbookPath);
	const worksheetRef = createWorkbookWorksheetRef(workbook, defaultWorkbookWorksheetId);

	const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:C4");
	await updateWorkbookRange(rangeRef, {
		values: worksheetData,
	});

	const source = defineSource<TestRecord>(worksheetRef, decode, encode);

	return source;
}

async function cleanup(source: Source<TestRecord>): Promise<void> {
	await tryDeleteDriveItem(source.worksheetRef);
}

describe("createSource", () => {
	it("creates a source with provided worksheet and mappings", () => {
		const worksheetRef = {
			contextId: "context-id" as ContextId,
			siteId: "site-id" as SiteId,
			driveId: "drive-id" as DriveId,
			itemId: "worksheet-id" as DriveItemId,
			worksheetId: "worksheet-id" as WorkbookWorksheetId,
		} satisfies WorkbookWorksheetRef;

		const source = defineSource<TestRecord>(worksheetRef, decode, encode);

		expect(source.worksheetRef).equal(worksheetRef);
		expect(source.encode).equal(encode);
		expect(source.decode).equal(decode);
	});
});

describe("listRecords", () => {
	it("lists all records from the source", async () => {
		const source = await setup();
		try {
			const records = await readAllItems(source);
			expect(records).toHaveLength(3);

			// Check first record
			expect(records[0].id).toBe(testRecord1.id);
			expect(records[0].name).toBe(testRecord1.name);
			expect(records[0].active).toBe(testRecord1.active);

			// Check second record
			expect(records[1].id).toBe(testRecord2.id);
			expect(records[1].name).toBe(testRecord2.name);
			expect(records[1].active).toBe(testRecord2.active);

			// Check third record
			expect(records[2].id).toBe(testRecord3.id);
			expect(records[2].name).toBe(testRecord3.name);
			expect(records[2].active).toBe(testRecord3.active);
		} finally {
			await cleanup(source);
		}
	});
});

describe("getRecords", () => {
	it("gets records with specified range", async () => {
		const source = await setup();
		try {
			const records = await readAllItems(source, 2 as SourceIndex, 2);
			expect(records).toHaveLength(2);

			// Check first returned record (testRecord2)
			expect(records[0].id).toBe(testRecord2.id);
			expect(records[0].name).toBe(testRecord2.name);
			expect(records[0].active).toBe(testRecord2.active);

			// Check second returned record (testRecord3)
			expect(records[1].id).toBe(testRecord3.id);
			expect(records[1].name).toBe(testRecord3.name);
			expect(records[1].active).toBe(testRecord3.active);
		} finally {
			await cleanup(source);
		}
	});
});

describe("getRecord", () => {
	it("gets a single record by index", async () => {
		const source = await setup();
		try {
			const record = await readItemByIndex(source, 3 as SourceIndex);
			expect(record.id).toBe(testRecord3.id);
			expect(record.name).toBe(testRecord3.name);
			expect(record.active).toBe(testRecord3.active);
		} finally {
			await cleanup(source);
		}
	});

	it("throws NotFoundError when record is not found", async () => {
		const source = await setup();
		try {
			await expect(readItemByIndex(source, 99 as SourceIndex)).rejects.toThrow(NotFoundError);
		} finally {
			await cleanup(source);
		}
	});
});

describe("setRecords", () => {
	it("sets multiple records at once", async () => {
		const source = await setup();
		try {
			const newRecords = [testRecord4, testRecord5];
			await setRecords(source, 4 as SourceIndex, newRecords);

			// Verify using getWorkbookRange
			const rangeRef = createWorkbookRangeRef(source.worksheetRef, "A5:C6");
			const range = await getWorkbookWorksheetRange(rangeRef);

			// Verify first new record (testRecord4) at row 5 (index 4)
			expect(Number(range.values[0][0])).toBe(testRecord4.id);
			expect(String(range.values[0][1])).toBe(testRecord4.name);
			expect(Boolean(range.values[0][2])).toBe(testRecord4.active);

			// Verify second new record (testRecord5) at row 6 (index 5)
			expect(Number(range.values[1][0])).toBe(testRecord5.id);
			expect(String(range.values[1][1])).toBe(testRecord5.name);
			expect(Boolean(range.values[1][2])).toBe(testRecord5.active);
		} finally {
			await cleanup(source);
		}
	});
});

describe("setRecord", () => {
	it("sets a single record", async () => {
		const source = await setup();
		try {
			await replaceItem(source, 2 as SourceIndex, testRecord6);

			// Verify using getWorkbookRange
			// Row 3 (index 2) should now have testRecord6
			const rangeRef = createWorkbookRangeRef(source.worksheetRef, "A3:C3");
			const range = await getWorkbookWorksheetRange(rangeRef);

			expect(Number(range.values[0][0])).toBe(testRecord6.id);
			expect(String(range.values[0][1])).toBe(testRecord6.name);
			expect(Boolean(range.values[0][2])).toBe(testRecord6.active);
		} finally {
			await cleanup(source);
		}
	});
});
