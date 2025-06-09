/**
 * Spreadsheet number format constants for Microsoft Graph API.
 * @module numberFormat
 * @category Services
 */

import type { NumberFormat } from "../models/NumberFormat.ts";

export const generalNumberFormat = "General" as NumberFormat;
export const numberNumberFormat = "#,##0.00" as NumberFormat;
export const currencyNumberFormat = "$#,##0.00" as NumberFormat;
export const accountingNumberFormat = '_($* #,##0.00_);_($* (#,##0.00);_($* "-"??_);_(@_)' as NumberFormat;
export const percentageNumberFormat = "0.00%" as NumberFormat;
export const dateShortNumberFormat = "dd/mm/yyyy" as NumberFormat;
export const timeNumberFormat = "h:mm:ss AM/PM" as NumberFormat;
export const textNumberFormat = "@" as NumberFormat;
