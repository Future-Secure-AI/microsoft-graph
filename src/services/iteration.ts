/**
 * @module Iteration
 * @category Services
 */

/**
 * Iterate over an AsyncIterable and collect all items into an array.
 * @param iterable
 * @returns Array of items collected from the iterable.
 */
export async function iterateToArray<T>(iterable: AsyncIterable<T>): Promise<T[]> {
	const result: T[] = [];
	for await (const item of iterable) {
		result.push(item);
	}
	return result;
}
