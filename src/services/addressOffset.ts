import type { ColumnAddress, RowAddress } from "../models/Address.ts";
import type { ColumnOffset } from "../models/ColumnOffset.ts";
import type { RowOffset } from "../models/RowOffset.ts";

/**
 * Converts a column address (e.g., "A") to a zero-based column offset.
 * @param column - The column address.
 * @returns The zero-based column offset.
 */
export function columnAddressToOffset(column: ColumnAddress): ColumnOffset {
	let offset = 0;
	for (let i = 0; i < column.length; i++) {
		offset = offset * 26 + (column.charCodeAt(i) - 65 + 1);
	}
	return (offset - 1) as ColumnOffset;
}

/**
 * Converts a zero-based column offset to a column address (e.g., "A").
 * @param offset - The zero-based column offset.
 * @returns The column address.
 */
export function offsetToColumnAddress(offset: ColumnOffset): ColumnAddress {
	let result = "";
	let currentOffset = offset + 1;
	while (currentOffset > 0) {
		currentOffset -= 1;
		result = String.fromCharCode((currentOffset % 26) + 65) + result;
		currentOffset = Math.floor(currentOffset / 26);
	}
	return result as ColumnAddress;
}

/**
 * Converts a row address (e.g., "1") to a zero-based row offset.
 * @param row - The row address.
 * @returns The zero-based row offset.
 */
export function rowAddressToOffset(row: RowAddress): RowOffset {
	return (Number.parseInt(row, 10) - 1) as RowOffset;
}

/**
 * Converts a zero-based row offset to a row address (e.g., "1").
 * @param offset - The zero-based row offset.
 * @returns The row address.
 */
export function offsetToRowAddress(offset: RowOffset): RowAddress {
	return (offset + 1).toString() as RowAddress;
}
