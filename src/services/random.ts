import { randomBytes } from "crypto";
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function generateRandomString(length = 16): string {
	let result = "";
	const bytes = randomBytes(length);
	for (let i = 0; i < length; i++) {
		const randomIndex = bytes[i] % characters.length;
		result += characters[randomIndex];
	}
	return result;
}
