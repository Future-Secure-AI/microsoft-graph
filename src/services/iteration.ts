/**
 * Utilities for iterating over AsyncIterables.
 * @module Iteration
 * @category Services
 */

/**
 * Iterate over an AsyncIterable and collect all items into an array.
 * @param iterable
 * @returns Array of items collected from the iterable.
 */
export async function iterateToArray<T, U = T>(iterable: AsyncIterable<T>, converter?: (item: T) => U): Promise<U[]> {
	const result: U[] = [];
	for await (const item of iterable) {
		result.push(converter ? converter(item) : (item as unknown as U));
	}
	return result;
}
