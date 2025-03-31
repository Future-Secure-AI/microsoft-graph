export type ColumnAddress = `${Uppercase<string>}`;
export type RowAddress = `${number}`;

export type ColumnRangeAddress = `${CellAddress}:${CellAddress}`;
export type RowRangeAddress = `${RowAddress}:${RowAddress}`;

export type BoxRangeAddress = `${CellAddress}:${CellAddress}`;

export type CellAddress = `${ColumnAddress}${RowAddress}`;

export type Address = ColumnAddress | RowAddress | ColumnRangeAddress | RowRangeAddress | BoxRangeAddress | CellAddress;
