import type { ColumnOffset } from "../models/ColumnOffset.ts";
import type { RowOffset } from "../models/RowOffset.ts";

export type Cartesian = {
	ax: ColumnOffset;
	ay: RowOffset;
	bx: ColumnOffset;
	by: RowOffset;
};
