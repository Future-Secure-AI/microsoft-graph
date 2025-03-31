import type { Cell } from "./Cell.ts";
import type { Column } from "./Column.ts";
import type { Row } from "./Row.ts";

export type Box = `${Cell}:${Cell}` | `${Column}:${Column}` | `${Row}:${Row}`;
