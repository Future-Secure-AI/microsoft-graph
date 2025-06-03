import type { Cell } from "./Cell.ts";
import type { ColumnName } from "./ColumnName.ts";

export type DataSourceRow = Record<ColumnName, Cell>;
