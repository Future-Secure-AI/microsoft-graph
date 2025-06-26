/**
 * Utilities for handling errors
 * @module error
 * @category Services
 */

/**
 * Determines if the error has a specific name.
 * @param error Error to check.
 * @param name Name to compare against.
 * @returns True if the error has the specified name, false otherwise.
 */
export function isErrorWithName(error: unknown, name: string): boolean {
	return !!error && typeof error === "object" && "name" in error && (error as { name?: string }).name === name;
}
