/**
 * Pointers to a workbook session .
 * @module WorkbookSession
 * @category Models
 */

/**
 * Identifier for a workbook session.
 */
export type WorkbookSessionId = string & {
	readonly __brand: unique symbol;
};
