import type { ColumnAddress, RowAddress } from "../models/Address.ts";
import type { ColumnOffset } from "../models/ColumnOffset.ts";
import type { RowOffset } from "../models/RowOffset.ts";

export function columnAddressToOffset(column: ColumnAddress): ColumnOffset {
	let offset = 0;
	for (let i = 0; i < column.length; i++) {
		offset = offset * 26 + (column.charCodeAt(i) - 65 + 1);
	}
	return (offset - 1) as ColumnOffset;
}

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

export function rowAddressToOffset(row: RowAddress): RowOffset {
	return (Number.parseInt(row, 10) - 1) as RowOffset;
}

export function offsetToRowAddress(offset: RowOffset): RowAddress {
	return (offset + 1).toString() as RowAddress;
}
