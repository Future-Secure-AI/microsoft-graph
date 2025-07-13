/**
 * Name of a font.
 * @category Models
 * @module FontName
 */
export type FontName = string & {
	readonly __brand: unique symbol;
};
