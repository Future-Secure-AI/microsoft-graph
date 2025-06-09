/**
 * Utilities for converting between operation IDs and indexes.
 * @module operationId
 * @category Services
 */

/**
 * Converts an operation index to an operation ID.
 * @param index - The operation index.
 * @returns The operation ID as a string.
 */
export function operationIndexToId(index: number): string {
	return index.toString();
}

/**
 * Converts an operation ID to an operation index.
 * @param id - The operation ID as a string.
 * @returns The operation index as a number.
 */
export function operationIdToIndex(id: string): number {
	return Number.parseInt(id, 10);
}
