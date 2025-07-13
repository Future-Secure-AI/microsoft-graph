/**
 * Color has a hexadecimal representation (ie #ffffff").
 * @category Models
 * @module Color
 */
export type Color = string & {
	readonly __brand: unique symbol;
};
