import { randomInt } from "node:crypto";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function generateRandomString(length = 16): string {
	let result = "";

	for (let i = 0; i < length; i++) {
		result += characters[randomInt(characters.length)];
	}

	return result;
}
