import type { Cell } from "../models/Cell.ts";
import type { ColumnHeading } from "../models/ColumnHeading.ts";

export type SourceRow = Record<ColumnHeading, Cell>;
