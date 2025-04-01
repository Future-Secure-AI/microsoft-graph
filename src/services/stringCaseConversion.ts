/**
 * Converts a kebab-case string to camelCase.
 * @param str - The kebab-case string.
 * @returns The camelCase string.
 */
export function kebabToCamelCase(str: string): string {
	return str
		.replace(/^-+|-+$/g, "") // Remove leading and trailing dashes
		.replace(/-([a-z])/g, (_: string, letter: string) => letter.toUpperCase());
}
