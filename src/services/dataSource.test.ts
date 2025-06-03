// import { describe, expect, it } from "vitest";
// import type { ColumnName } from "../models/ColumnName.ts";
// import type { DataSource } from "../models/DataSource.ts";
// import type { DataSourceIndex } from "../models/DataSourceIndex.ts";
// import type { DataSourceRow } from "../models/DataSourceRow.ts";
// import createWorkbook from "../operations/workbook/createWorkbook.ts";
// import getWorkbookWorksheetRange from "../operations/workbookRange/getWorkbookWorksheetRange.ts";
// import updateWorkbookRange from "../operations/workbookRange/updateWorkbookRange.ts";
// import createWorkbookWorksheet from "../operations/workbookWorksheet/createWorkbookWorksheet.ts";
// import tryDeleteDriveItem from "../tasks/tryDeleteDriveItem.ts";
// import { createItem, defineDataSource, deleteItem, initializeDataSource, readAllItems, updateItem } from "./dataSource.ts";
// import { getDefaultDriveRef } from "./drive.ts";
// import { driveItemPath } from "./driveItem.ts";
// import { generalNumberFormat } from "./numberFormat.ts";
// import { generateTempFileName } from "./temporaryFiles.ts";
// import { createWorkbookRangeRef } from "./workbookRange.ts";

// // Helper to cast string to CellText
// function asCellText(text: string): import("../models/CellText.ts").CellText {
// 	return text as unknown as import("../models/CellText.ts").CellText;
// }

// type TestRecord = {
// 	id: number;
// 	name: string;
// 	active: boolean;
// };

// const idAttribute = "id" as ColumnName;
// const nameAttribute = "name" as ColumnName;
// const activeAttribute = "active" as ColumnName;

// const testRecord1: TestRecord = { id: 1, name: "Item 1", active: true };
// const testRecord2: TestRecord = { id: 2, name: "Item 2", active: false };
// const testRecord3: TestRecord = { id: 3, name: "Item 3", active: true };
// const testRecord4: TestRecord = { id: 4, name: "New Item 4", active: true };
// const testRecord5: TestRecord = { id: 5, name: "New Item 5", active: false };

// const worksheetData = [
// 	[idAttribute, nameAttribute, activeAttribute],
// 	[testRecord1.id, testRecord1.name, testRecord1.active],
// 	[testRecord2.id, testRecord2.name, testRecord2.active],
// 	[testRecord3.id, testRecord3.name, testRecord3.active],
// ];

// const decode = (row: DataSourceRow): TestRecord => {
// 	return {
// 		id: Number(row[idAttribute].value),
// 		name: String(row[nameAttribute].value),
// 		active: Boolean(row[activeAttribute].value),
// 	};
// };

// const encode = (record: TestRecord): DataSourceRow => {
// 	return {
// 		[idAttribute]: {
// 			text: asCellText(record.id.toString()),
// 			value: record.id,
// 			numberFormat: generalNumberFormat,
// 		},
// 		[nameAttribute]: {
// 			text: asCellText(record.name),
// 			value: record.name,
// 			numberFormat: generalNumberFormat,
// 		},
// 		[activeAttribute]: {
// 			text: asCellText(record.active.toString()),
// 			value: record.active,
// 			numberFormat: generalNumberFormat,
// 		},
// 	};
// };

// async function prepareSource(filled: boolean): Promise<DataSource<TestRecord>> {
// 	const workbookName = generateTempFileName("xlsx");
// 	const workbookPath = driveItemPath(workbookName);
// 	const driveRef = getDefaultDriveRef();
// 	const workbook = await createWorkbook(driveRef, workbookPath);
// 	const worksheetRef = await createWorkbookWorksheet(workbook);

// 	let rangeRef: import("../models/WorkbookRangeRef.ts").WorkbookRangeRef;
// 	if (filled) {
// 		rangeRef = createWorkbookRangeRef(worksheetRef, "A1:C4");
// 		await updateWorkbookRange(rangeRef, {
// 			values: worksheetData,
// 		});
// 	} else {
// 		rangeRef = createWorkbookRangeRef(worksheetRef, "A1:A1");
// 	}

// 	const source = await defineDataSource<TestRecord>(rangeRef, decode, encode);
// 	return source;
// }

// async function cleanupSource(source: DataSource<TestRecord>): Promise<void> {
// 	await tryDeleteDriveItem(source.rangeRef);
// }

// describe("defineDataSource", () => {
// 	it("can create a source on a populated sheet", async () => {
// 		const source = await prepareSource(true);
// 		try {
// 			expect(source.coding.encode).toBe(encode);
// 			expect(source.coding.decode).toBe(decode);
// 			expect(source.rangeRef.address).toBe("A1:C4");
// 		} finally {
// 			await cleanupSource(source);
// 		}
// 	});

// 	it("can create a source on an empty sheet", async () => {
// 		const source = await prepareSource(false);
// 		try {
// 			expect(source.coding.encode).toBe(encode);
// 			expect(source.coding.decode).toBe(decode);
// 			expect(source.rangeRef.address).toBe("A1:A1");
// 		} finally {
// 			await cleanupSource(source);
// 		}
// 	});
// });

// describe("initializeSource", () => {
// 	it("can initialize on an empty range", async () => {
// 		const source = await prepareSource(false);
// 		try {
// 			await initializeDataSource(source, testRecord1);
// 			expect(source.head).toEqual([idAttribute, nameAttribute, activeAttribute]);
// 			// TODO: Check header created
// 		} finally {
// 			await cleanupSource(source);
// 		}
// 	});

// 	it("can not initialize on a populated range", async () => {
// 		const source = await prepareSource(true);
// 		try {
// 			await expect(initializeDataSource(source, testRecord1)).rejects.toThrowError("Cannot initialize source with non-empty worksheet.");
// 		} finally {
// 			await cleanupSource(source);
// 		}
// 	});
// });

// describe("readAllItems", () => {
// 	it("can list all records from a populated source", async () => {
// 		const source = await prepareSource(true);
// 		try {
// 			const records = await readAllItems(source);
// 			expect(records.length).toBe(3);
// 			expect(records[0].record).toEqual(testRecord1);
// 			expect(records[1].record).toEqual(testRecord2);
// 			expect(records[2].record).toEqual(testRecord3);
// 		} finally {
// 			await cleanupSource(source);
// 		}
// 	});

// 	it("can return an empty array when source is empty", async () => {
// 		const source = await prepareSource(false);
// 		try {
// 			await initializeDataSource(source, testRecord1);
// 			const records = await readAllItems(source);
// 			expect(records).toEqual([]);
// 		} finally {
// 			await cleanupSource(source);
// 		}
// 	});
// });

// describe("createItem", () => {
// 	it("can insert a new record after the header row", async () => {
// 		const source = await prepareSource(true);
// 		try {
// 			const newRecord = testRecord4;
// 			await createItem(source, newRecord, 1 as DataSourceIndex);
// 			const rangeRef = createWorkbookRangeRef(source.rangeRef, "A2:C2");
// 			const range = await getWorkbookWorksheetRange(rangeRef);
// 			expect(Number(range.values[0][0])).toBe(newRecord.id);
// 			expect(String(range.values[0][1])).toBe(newRecord.name);
// 			expect(Boolean(range.values[0][2])).toBe(newRecord.active);
// 		} finally {
// 			await cleanupSource(source);
// 		}
// 	});

// 	it("can not createItem if not initialized", async () => {
// 		const source = await prepareSource(true);
// 		try {
// 			await expect(createItem(source, testRecord1, 1 as DataSourceIndex)).rejects.toThrowError("Source not initialized.");
// 		} finally {
// 			await cleanupSource(source);
// 		}
// 	});
// });

// describe("updateItem", () => {
// 	it("can update an existing record at a given offset", async () => {
// 		const source = await prepareSource(true);
// 		try {
// 			const updatedRecord = testRecord5;
// 			await updateItem(source, 2 as DataSourceIndex, updatedRecord);
// 			const rangeRef = createWorkbookRangeRef(source.rangeRef, "A3:C3");
// 			const range = await getWorkbookWorksheetRange(rangeRef);
// 			expect(Number(range.values[0][0])).toBe(updatedRecord.id);
// 			expect(String(range.values[0][1])).toBe(updatedRecord.name);
// 			expect(Boolean(range.values[0][2])).toBe(updatedRecord.active);
// 		} finally {
// 			await cleanupSource(source);
// 		}
// 	});

// 	it("can not updateItem if not initialized", async () => {
// 		const source = await prepareSource(true);
// 		await cleanupSource(source);
// 		await expect(updateItem(source, 1 as DataSourceIndex, testRecord1)).rejects.toThrowError("Source not initialized.");
// 	});
// });

// describe("deleteItem", () => {
// 	it("can delete a record at a given offset", async () => {
// 		const source = await prepareSource(true);
// 		try {
// 			await deleteItem(source, 2 as DataSourceIndex);
// 			const records = await readAllItems(source);
// 			expect(records.length).toBe(2);
// 			expect(records[0].record).toEqual(testRecord1);
// 			expect(records[1].record).toEqual(testRecord3);
// 		} finally {
// 			await cleanupSource(source);
// 		}
// 	});

// 	it("can not deleteItem if not initialized", async () => {
// 		const source = await prepareSource(true);
// 		await cleanupSource(source);
// 		await expect(deleteItem(source, 1 as DataSourceIndex)).rejects.toThrowError("Source not initialized.");
// 	});
// });
