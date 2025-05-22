import type { CellValue } from "./CellValue.ts";
import type { ColumnHeading } from "./ColumnHeading.ts";

export type SourceRowValue = Record<ColumnHeading, CellValue>;
