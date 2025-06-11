import { describe, expect, it } from "vitest";
import type { ColumnName } from "../models/Column.ts";
import type { DataSource, DataSourceRow, ItemIndex } from "../models/DataSource.ts";
import createWorkbook from "../operations/workbook/createWorkbook.ts";
import getWorkbookWorksheetRange from "../operations/workbookRange/getWorkbookWorksheetRange.ts";
import updateWorkbookRange from "../operations/workbookRange/updateWorkbookRange.ts";
import createWorkbookWorksheet from "../operations/workbookWorksheet/createWorkbookWorksheet.ts";
import tryDeleteDriveItem from "../tasks/tryDeleteDriveItem.ts";
import { subRange } from "./addressManipulation.ts";
import { createItem, dataSourceFromRange, deleteItem, updateItem } from "./dataSource.ts";
import { getDefaultDriveRef } from "./drive.ts";
import { driveItemPath } from "./driveItem.ts";
import { iterateToArray } from "./iteration.ts";
import { generateTempFileName } from "./temporaryFiles.ts";
import { createWorkbookRangeRef } from "./workbookRange.ts";

type TestRecord = {
	id: number;
	name: string;
	active: boolean;
};

const idAttribute = "id" as ColumnName;
const nameAttribute = "name" as ColumnName;
const activeAttribute = "active" as ColumnName;

const testRecord1: TestRecord = { id: 1, name: "Item 1", active: true };
const testRecord2: TestRecord = { id: 2, name: "Item 2", active: false };
const testRecord3: TestRecord = { id: 3, name: "Item 3", active: true };
const testRecord4: TestRecord = { id: 4, name: "New Item 4", active: true };
const testRecord5: TestRecord = { id: 5, name: "New Item 5", active: false };

const worksheetData = [
	[idAttribute, nameAttribute, activeAttribute],
	[testRecord1.id, testRecord1.name, testRecord1.active],
	[testRecord2.id, testRecord2.name, testRecord2.active],
	[testRecord3.id, testRecord3.name, testRecord3.active],
];

const decode = (row: DataSourceRow): TestRecord => {
	return {
		id: Number(row[idAttribute].value),
		name: String(row[nameAttribute].value),
		active: Boolean(row[activeAttribute].value),
	};
};

const encode = (record: TestRecord): DataSourceRow => {
	return {
		[idAttribute]: {
			value: record.id,
		},
		[nameAttribute]: {
			value: record.name,
		},
		[activeAttribute]: {
			value: record.active,
		},
	};
};

async function prepareSource(): Promise<DataSource<TestRecord>> {
	const workbookName = generateTempFileName("xlsx");
	const workbookPath = driveItemPath(workbookName);
	const driveRef = getDefaultDriveRef();
	const workbook = await createWorkbook(driveRef, workbookPath);
	const worksheetRef = await createWorkbookWorksheet(workbook);

	const rangeRef = createWorkbookRangeRef(worksheetRef, "C3:E6"); // Intentionally not at the top
	await updateWorkbookRange(rangeRef, {
		values: worksheetData,
	});

	const source = await dataSourceFromRange<TestRecord>(rangeRef, decode, encode);
	return source;
}

async function cleanupSource(source: DataSource<TestRecord>): Promise<void> {
	await tryDeleteDriveItem(source.bodyRef);
}

describe("defineDataSource", () => {
	it("can create a source on a populated sheet", async () => {
		const source = await prepareSource();
		try {
			expect(source.coding.encode).toBe(encode);
			expect(source.coding.decode).toBe(decode);
			expect(source.bodyRef.address).toBe("C4:E6");
			expect(source.bodyOffset).toBe(3);
		} finally {
			await cleanupSource(source);
		}
	});

	it("throws when creating a source on an empty sheet", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbook(driveRef, workbookPath);
		const worksheetRef = await createWorkbookWorksheet(workbook);

		const rangeRef = createWorkbookRangeRef(worksheetRef, "A1");

		await expect(dataSourceFromRange<TestRecord>(rangeRef, decode, encode)).rejects.toThrow();
	});
});

describe("listItems", () => {
	it("can list all records from a populated source", async () => {
		const source = await prepareSource();
		try {
			const records = await iterateToArray(source);
			expect(records.length).toBe(3);

			expect(records[0].index).toEqual(0);
			expect(records[0].rowNumber).toEqual(4);
			expect(records[0].record).toEqual(testRecord1);

			expect(records[1].index).toEqual(1);
			expect(records[1].rowNumber).toEqual(5);
			expect(records[1].record).toEqual(testRecord2);

			expect(records[2].index).toEqual(2);
			expect(records[2].rowNumber).toEqual(6);
			expect(records[2].record).toEqual(testRecord3);
		} finally {
			await cleanupSource(source);
		}
	});
});

describe("createItem", () => {
	it("can create item at end", async () => {
		const source = await prepareSource();
		try {
			const newRecord = testRecord4;

			const item = await createItem(source, newRecord);
			expect(item.index).toBe(3);
			expect(item.rowNumber).toBe(7);
			expect(item.record).toEqual(newRecord);

			const range = await getWorkbookWorksheetRange(subRange(source.bodyRef, -1, 1));
			expect(Number(range.values[0][0])).toBe(newRecord.id);
			expect(String(range.values[0][1])).toBe(newRecord.name);
			expect(Boolean(range.values[0][2])).toBe(newRecord.active);
		} finally {
			await cleanupSource(source);
		}
	});

	it("can create item at start", async () => {
		const source = await prepareSource();
		try {
			const newRecord = testRecord4;

			const item = await createItem(source, newRecord, -1 as ItemIndex);
			expect(item.index).toBe(0);
			expect(item.rowNumber).toBe(4);
			expect(item.record).toEqual(newRecord);

			const range = await getWorkbookWorksheetRange(subRange(source.bodyRef, 0, 1));
			expect(Number(range.values[0][0])).toBe(newRecord.id);
			expect(String(range.values[0][1])).toBe(newRecord.name);
			expect(Boolean(range.values[0][2])).toBe(newRecord.active);
		} finally {
			await cleanupSource(source);
		}
	});
});

describe("updateItem", () => {
	it("can update an existing record at a given offset", async () => {
		const source = await prepareSource();
		try {
			const updatedRecord = testRecord5;
			const index = 2 as ItemIndex;

			await updateItem(source, index, updatedRecord);

			const range = await getWorkbookWorksheetRange(subRange(source.bodyRef, index, 1));
			expect(Number(range.values[0][0])).toBe(updatedRecord.id);
			expect(String(range.values[0][1])).toBe(updatedRecord.name);
			expect(Boolean(range.values[0][2])).toBe(updatedRecord.active);
		} finally {
			await cleanupSource(source);
		}
	});
});

describe("deleteItem", () => {
	it("can delete a record at a given offset", async () => {
		const source = await prepareSource();
		try {
			const index = 1 as ItemIndex;

			await deleteItem(source, index);

			const records = await iterateToArray(source);
			expect(records.length).toBe(2);
			expect(records[0].record).toEqual(testRecord1);
			expect(records[1].record).toEqual(testRecord3);
		} finally {
			await cleanupSource(source);
		}
	});
});
