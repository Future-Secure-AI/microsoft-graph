import type { Box } from "./Box.ts";
import type { Cell } from "./Cell.ts";

export type RangeAddressUnderlying = Cell | Box;

export type RangeAddress = RangeAddressUnderlying & {
	__brand: "WorkbookRangeAddress";
};
