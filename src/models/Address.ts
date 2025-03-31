export type ColumnAddress = `${Uppercase<string>}`;
export type ColumnRangeAddress = `${CellAddress}:${CellAddress}`;

export type RowAddress = `${number}`;
export type RowRangeAddress = `${RowAddress}:${RowAddress}`;

export type CellAddress = `${ColumnAddress}${RowAddress}`;
export type CellRangeAddress = `${CellAddress}:${CellAddress}`;

export type Address = ColumnAddress | RowAddress | ColumnRangeAddress | RowRangeAddress | CellRangeAddress | CellAddress;
