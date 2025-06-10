// biome-ignore lint/style/useFilenamingConvention: Appropriate in this context

/**
 * Column pointers.
 * @module Column
 * @category Models
 */

/**
 * Zero-based index representing the position of a column in a range.
 */
export type ColumnOffset = number & {
	__brand: "ColumnOffset";
};

/**
 * Name of a column, as configured by the user.
 */
export type ColumnName = string & {
	__brand: "ColumnName";
};
