/**
 * Spreadsheet number format constants for Microsoft Graph API.
 * @module CellFormat
 * @category Services
 */

import type { CellFormat } from "../models/Cell.ts";

export const generalCellFormat = "General" as CellFormat;
export const numberCellFormat = "#,##0.00" as CellFormat;
export const currencyCellFormat = "$#,##0.00" as CellFormat;
export const accountingCellFormat = '_($* #,##0.00_);_($* (#,##0.00);_($* "-"??_);_(@_)' as CellFormat;
export const percentageCellFormat = "0.00%" as CellFormat;
export const dateShortCellFormat = "dd/mm/yyyy" as CellFormat;
export const timeCellFormat = "h:mm:ss AM/PM" as CellFormat;
export const textCellFormat = "@" as CellFormat;
