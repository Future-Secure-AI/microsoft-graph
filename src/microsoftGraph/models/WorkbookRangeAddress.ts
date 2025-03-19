type Column = `${Uppercase<string>}`;
type Row = `${number}`;

type SingleAddress = `${Column}${Row}`;
type BoxAddress = `${SingleAddress}:${SingleAddress}`;

export type WorkbookRangeAddressUnderlying = SingleAddress | BoxAddress;

export type WorkbookRangeAddress = WorkbookRangeAddressUnderlying & {
    __brand: "WorkbookRangeAddress";
};
