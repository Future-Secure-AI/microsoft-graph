type Column = `${Uppercase<string>}`;
type Row = `${number}`;

type Cell = `${Column}${Row}`;
type Box = `${Cell}:${Cell}` | `${Column}:${Column}` | `${Row}:${Row}`;

export type WorkbookRangeAddressUnderlying = Cell | Box;

export type WorkbookRangeAddress = WorkbookRangeAddressUnderlying & {
	__brand: "WorkbookRangeAddress";
};
