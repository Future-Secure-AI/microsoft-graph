export function isHttpOk(status: number): boolean {
	return status >= 200 && status < 300;
}

export function isHttpTooManyRequests(status: number): boolean {
	return status === 429;
}
