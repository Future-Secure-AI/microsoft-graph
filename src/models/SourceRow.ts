import type { Cell } from "../models/Cell.ts";
import type { ColumnName } from "../models/ColumnName.ts";

export type SourceRow = Record<ColumnName, Cell>;
