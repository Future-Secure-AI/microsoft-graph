/**
 * Cell utilities.
 * @module CellFormat
 * @category Services
 */

import type { CellFormat, CellScope } from "../models/Cell.ts";

export const generalCellFormat = "General" as CellFormat;
export const textCellFormat = "@" as CellFormat;
export const numberCellFormat = "#,##0.00" as CellFormat;
export const accountingCellFormat = '_($* #,##0.00_);_($* (#,##0.00);_($* "-"??_);_(@_)' as CellFormat;
// export const currencyCellFormat = "$#,##0.00" as CellFormat;
// export const percentageCellFormat = "0.00%" as CellFormat;
// export const dateShortCellFormat = "dd/mm/yyyy" as CellFormat;
// export const timeCellFormat = "h:mm:ss AM/PM" as CellFormat;

export const defaultCellScope: CellScope = {
	value: true,
	text: true,
	format: true,
	alignment: false,
	border: false,
	fill: false,
	font: false,
};
