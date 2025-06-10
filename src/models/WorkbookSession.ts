// biome-ignore lint/style/useFilenamingConvention: Appropriate in this context

/**
 * Pointers to a workbook session .
 * @module WorkbookSession
 * @category Models
 */

/**
 * Identifier for a workbook session.
 */
export type WorkbookSessionId = string & {
	__brand: "WorkbookSessionId";
};
