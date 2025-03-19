import InvalidArgumentError from "../errors/InvalidArgumentError.js";
import type { WorkbookRangeAddress, WorkbookRangeAddressUnderlying } from "../models/WorkbookRangeAddress.js";

const addressPattern = /^[A-Z]+\d+(:[A-Z]+\d+)?$/;

export function workbookRangeAddress(address: WorkbookRangeAddressUnderlying): WorkbookRangeAddress {
    if (!addressPattern.test(address)) {
        throw new InvalidArgumentError(`Invalid address format. It must match the pattern ${addressPattern}.`);
    }

    return address as WorkbookRangeAddress;
}