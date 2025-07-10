import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import type { Address, CellRangeAddress, UsedAddress } from "../models/Address.ts";
import { composeAddress, decomposeAddress } from "./addressManipulation.ts";
import { columnAddressToOffset, rowAddressToOffset } from "./addressOffset.ts";

const pattern = /^(?<startColumn>[A-Z]*)(?<startRow>[0-9]*):(?<endColumn>[A-Z]*)(?<endRow>[0-9]*)$/;

/**
 * Resolves a used range address (which may use partial or open-ended A1 notation, e.g., ":D5", "C:", etc.) against a concrete used range.
 *
 * This function fills in any missing start/end columns or rows in the `usedRangeAddress` using the corresponding values from the provided `usedRange`.
 *
 * @param address - The used range address (may be open-ended, e.g., ":D5", "C:", etc.).
 * @param usedRange - The concrete used range address to resolve against (e.g., "B2:E10").
 * @returns The resolved address as a concrete A1 range (e.g., "C2:E10"), or null if there is no overlap.
 * @throws {InvalidArgumentError} If the used range address is invalid or cannot be resolved.
 *
 * @example
 * // If usedRange is "B2:E10":
 * //   resolveUsedRangeAddress("C:", usedRange)   // "C2:E10"
 * //   resolveUsedRangeAddress(":D", usedRange)   // "B2:D10"
 * //   resolveUsedRangeAddress("3:", usedRange)   // "B3:E10"
 * //   resolveUsedRangeAddress(":5", usedRange)   // "B2:E5"
 * //   resolveUsedRangeAddress("C3:", usedRange)  // "C3:E10"
 * //   resolveUsedRangeAddress(":D5", usedRange)  // "B2:D5"
 * //   resolveUsedRangeAddress(":", usedRange)    // "B2:E10"
 * //   resolveUsedRangeAddress("Z100:Z200", usedRange) // null (no overlap)
 * //   resolveUsedRangeAddress("A1:A1", usedRange) // null (no overlap)
 */
export function resolveUsedAddress(address: Address | UsedAddress, usedRange: CellRangeAddress): Address | null {
	const match = pattern.exec(address.toUpperCase());
	if (!match || !match.groups) {
		throw new InvalidArgumentError(`Invalid used range address '${address}', Must match pattern '${pattern}'.`);
	}
	let { startColumn, startRow, endColumn, endRow } = match.groups;

	const { startColumn: usedStartColumn, endColumn: usedEndColumn, startRow: usedStartRow, endRow: usedEndRow } = decomposeAddress(usedRange);
	if (!startColumn) startColumn = usedStartColumn;
	if (!endColumn) endColumn = usedEndColumn;
	if (!startRow) startRow = usedStartRow;
	if (!endRow) endRow = usedEndRow;

	const resolved = composeAddress({
		startColumn: startColumn as Uppercase<string>,
		endColumn: endColumn as Uppercase<string>,
		startRow: startRow as `${number}`,
		endRow: endRow as `${number}`,
	});

	const decomposed = decomposeAddress(resolved);

	const resStartCol = columnAddressToOffset(decomposed.startColumn);
	const resEndCol = columnAddressToOffset(decomposed.endColumn);
	const usedStartCol = columnAddressToOffset(usedStartColumn);
	const usedEndCol = columnAddressToOffset(usedEndColumn);
	const resStartRow = rowAddressToOffset(decomposed.startRow);
	const resEndRow = rowAddressToOffset(decomposed.endRow);
	const usedStartRowNum = rowAddressToOffset(usedStartRow);
	const usedEndRowNum = rowAddressToOffset(usedEndRow);

	const colOverlap = resStartCol <= usedEndCol && resEndCol >= usedStartCol;
	const rowOverlap = resStartRow <= usedEndRowNum && resEndRow >= usedStartRowNum;

	if (!colOverlap || !rowOverlap) {
		return null;
	}

	return resolved;
}
