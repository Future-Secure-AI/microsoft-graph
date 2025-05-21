import type { CellValue } from "../models/CellValue.ts";
import type { NumberFormat } from "../services/source.ts";

export type Cell = {
	text: string;
	value: CellValue;
	numberFormat: NumberFormat;
};
