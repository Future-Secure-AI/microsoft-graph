import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import type { Address } from "../models/Address.ts";
import type { Cartesian } from "../models/Cartesian.ts";
import { composeAddress, decomposeAddress } from "./addressManipulation.ts";
import { columnAddressToOffset, columnOffsetToAddress, rowAddressToOffset, rowOffsetToAddress } from "./addressOffset.ts";

/**
 * Converts a cell range address to Cartesian coordinates.
 *
 * @param {Address} address - The cell range address (e.g., "A1:C3").
 * @returns {Cartesian} The Cartesian representation of the address, with start and end coordinates.
 */
export function addressToCartesian(address: Address): Cartesian {
	const components = decomposeAddress(address);

	const ax = columnAddressToOffset(components.startColumn);
	const ay = rowAddressToOffset(components.startRow);

	const bx = columnAddressToOffset(components.endColumn);
	const by = rowAddressToOffset(components.endRow);

	return { ax, ay, bx, by };
}

/**
 * Converts Cartesian coordinates to a cell range address.
 *
 * @param {Cartesian} cartesian - The Cartesian coordinates, including start (ax, ay) and end (bx, by).
 * @returns {Address} The cell range address (e.g., "A1:C3").
 */
export function cartesianToAddress({ ax, ay, bx, by }: Cartesian): Address { // TODO: xa, xb, ya, yb ?
	const startColumn = columnOffsetToAddress(ax);
	const startRow = rowOffsetToAddress(ay);
	const endColumn = columnOffsetToAddress(bx);
	const endRow = rowOffsetToAddress(by);

	if (ax > bx) {
		throw new InvalidArgumentError("Invalid address. End column is before start column.");
	}
	if (ay > by) {
		throw new InvalidArgumentError("Invalid address. End row is before start row.");
	}

	const address = composeAddress({
		startRow,
		startColumn,
		endRow,
		endColumn,
	});

	return address;
}
