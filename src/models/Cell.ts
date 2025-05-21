import type { CellValue } from "../models/CellValue.ts";
import type { NumberFormat } from "./NumberFormat.ts";

export type Cell = {
	text: string;
	value: CellValue;
	numberFormat: NumberFormat;
};
