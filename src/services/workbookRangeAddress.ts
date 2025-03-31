import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import type { RangeAddress, RangeAddressUnderlying } from "../models/RangeAddress.ts";

const addressPattern = /^[A-Z]+\d+(:[A-Z]+\d+)?$/;

export function createWorkbookRangeAddress(address: RangeAddressUnderlying): RangeAddress {
	if (!addressPattern.test(address)) {
		throw new InvalidArgumentError(`Invalid address format. It must match the pattern ${addressPattern}.`);
	}

	return address as RangeAddress;
}
