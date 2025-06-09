/**
 * Utility for pausing execution (sleep) in async workflows.
 * @module sleep
 * @category Services
 */

/**
 * Pauses execution for the specified number of milliseconds.
 * @param ms - Number of milliseconds to sleep.
 * @returns A promise that resolves after the specified time.
 */
export function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
