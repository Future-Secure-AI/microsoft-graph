/**
 * Utilities for converting string case styles (e.g., kebab-case to camelCase).
 * @module stringCaseConversion
 * @category Services
 */

import InvalidArgumentError from "../errors/InvalidArgumentError.ts";

/**
 * Converts a kebab-case string to camelCase.
 * @param str Kebab-case string.
 * @returns CamelCase string.
 */
export function kebabToCamelCase(str: string): string {
	if (str.length > 1000) {
		throw new InvalidArgumentError("String length exceeds 1000 characters.");
	}

	return str
		.replace(/^-+|-+$/g, "") // Remove leading and trailing dashes
		.replace(/-([a-z])/g, (_: string, letter: string) => letter.toUpperCase());
}

/**
 * Converts a camelCase string to PascalCase.
 * @param str CamelCase string.
 * @returns PascalCase string.
 */
export function camelCaseToPascalCase(str: string): string {
	if (!str) {
		return str;
	}
	return str.charAt(0).toUpperCase() + str.slice(1);
}
