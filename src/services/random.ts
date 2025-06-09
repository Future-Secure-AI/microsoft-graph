/**
 * Utilities for generating random values for spreadsheet and API operations.
 * @module random
 * @category Services
 */

import { randomInt } from "node:crypto";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

/**
 * Generates a random alphanumeric string of the specified length.
 * @param length - The length of the string to generate. Defaults to 16.
 * @returns A random alphanumeric string.
 */
export function generateRandomString(length = 16): string {
	let result = "";

	for (let i = 0; i < length; i++) {
		result += characters[randomInt(characters.length)];
	}

	return result;
}
