/**
 * Utilities for iterating over AsyncIterables.
 * Collects all items from an Iterable or AsyncIterable into an array, optionally converting each item.
 * @module Iteration
 * @category Services
 * @template TIn The type of items in the input iterable.
 * @template TOut The type of items in the resulting array (after conversion).
 * @param {Iterable<TIn> | AsyncIterable<TIn>} iterable - The iterable or async iterable to collect items from.
 * @returns {Promise<TOut[]>} A promise that resolves to an array of collected (and possibly converted) items.
 */
export async function iterateToArray<TIn, TOut = TIn>(iterable: Iterable<TIn> | AsyncIterable<TIn>, converter?: (item: TIn) => TOut): Promise<TOut[]> {
	const result: TOut[] = [];
	for await (const item of iterable) {
		result.push(converter ? converter(item) : (item as unknown as TOut));
	}
	return result;
}
