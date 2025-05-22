/**
 * Checks if the HTTP status code indicates a successful response.
 * @param status - The HTTP status code.
 * @returns True if the status code is in the range 200-299, otherwise false.
 */
export function isHttpSuccess(status: number): boolean {
	return status >= 200 && status < 300;
}

/**
 * Checks if the HTTP status code is OK
 * @param status - The HTTP status code.
 * @returns True if the status code is 200, otherwise false.
 */
export function isHttpOk(status: number): boolean {
	return status === 200;
}

/**
 * Checks if the HTTP status code indicates not found.
 * @param status - The HTTP status code.
 * @returns True if the status code is 404, otherwise false.
 */
export function isHttpNotFound(status: number): boolean {
	return status === 404;
}

/**
 * Checks if the HTTP status code indicates too many requests (rate limiting).
 * @param status - The HTTP status code.
 * @returns True if the status code is 429, otherwise false.
 */
export function isHttpTooManyRequests(status: number): boolean {
	return status === 429;
}

/**
 * Checks if the HTTP status code indicates the service is unavailable.
 * @param status - The HTTP status code.
 * @returns True if the status code is 503, otherwise false.
 */
export function isServiceUnavailable(status: number): boolean {
	return status === 503;
}

/**
 * Checks if the HTTP status code indicates a gateway has timed out.
 * @param status - The HTTP status code.
 * @returns True if the status code is 504, otherwise false.
 */
export function isGatewayTimeout(status: number): boolean {
	return status === 504;
}

/**
 * Checks if the HTTP status code indicates the resource is locked
 * @param status - The HTTP status code.
 * @returns True if the status code is 423, otherwise false.
 */
export function isLocked(status: number): boolean {
	return status === 423;
}
