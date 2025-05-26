import type { CellValue } from "../models/CellValue.ts";
import type { CellText } from "./CellText.ts";
import type { NumberFormat } from "./NumberFormat.ts";

export type Cell = {
	text: CellText;
	value: CellValue;
	numberFormat: NumberFormat;
};
