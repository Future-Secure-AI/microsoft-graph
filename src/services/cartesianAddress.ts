import type { Address } from "../models/Address.ts";
import type { Cartesian } from "../models/Cartesian.ts";
import { composeAddress, decomposeAddress } from "./addressManipulation.ts";
import { columnAddressToOffset, columnOffsetToAddress, rowAddressToOffset, rowOffsetToAddress } from "./addressOffset.ts";

export function addressToCartesian(address: Address): Cartesian {
	const components = decomposeAddress(address);

	const ax = columnAddressToOffset(components.startColumn);
	const ay = rowAddressToOffset(components.startRow);

	const bx = columnAddressToOffset(components.endColumn);
	const by = rowAddressToOffset(components.endRow);

	return { ax, ay, bx, by };
}

export function cartesianToAddress(cartesian: Cartesian): Address {
	const startColumn = columnOffsetToAddress(cartesian.ax);
	const startRow = rowOffsetToAddress(cartesian.ay);
	const endColumn = columnOffsetToAddress(cartesian.bx);
	const endRow = rowOffsetToAddress(cartesian.by);

	const address = composeAddress({
		startRow,
		startColumn,
		endRow,
		endColumn,
	});

	return address;
}
