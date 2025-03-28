import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import type { WorkbookRangeAddress, WorkbookRangeAddressUnderlying } from "../models/WorkbookRangeAddress.ts";

const addressPattern = /^[A-Z]+\d+(:[A-Z]+\d+)?$/;

export function createWorkbookRangeAddress(address: WorkbookRangeAddressUnderlying): WorkbookRangeAddress {
	if (!addressPattern.test(address)) {
		throw new InvalidArgumentError(`Invalid address format. It must match the pattern ${addressPattern}.`);
	}

	return address as WorkbookRangeAddress;
}
