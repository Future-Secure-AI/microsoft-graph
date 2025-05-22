import type { CellValue } from "./CellValue.ts";
import type { ColumnName } from "./ColumnName.ts";

export type SourceRowValue = Record<ColumnName, CellValue>;
