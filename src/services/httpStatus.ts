/**
 * Utilities for analyzing HTTP status codes for Microsoft Graph API responses.
 * @module httpStatus
 * @category Services
 */

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
 * Checks if the HTTP status code is created
 * @param status - The HTTP status code.
 * @returns True if the status code is 201, otherwise false.
 */
export function isHttpCreated(status: number): boolean {
	return status === 201;
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
export function isHttpServiceUnavailable(status: number): boolean {
	return status === 503;
}

/**
 * Checks if the HTTP status code indicates a gateway has timed out.
 * @param status - The HTTP status code.
 * @returns True if the status code is 504, otherwise false.
 */
export function isHttpGatewayTimeout(status: number): boolean {
	return status === 504;
}

/**
 * Checks if the HTTP status code indicates the resource is locked
 * @param status - The HTTP status code.
 * @returns True if the status code is 423, otherwise false.
 */
export function isHttpLocked(status: number): boolean {
	return status === 423;
}

/**
 * Checks if the HTTP status code indicates a bad request.
 * @param status - The HTTP status code.
 * @returns True if the status code is 400, otherwise false.
 */
export function isHttpBadRequest(status: number): boolean {
	return status === 400;
}

/**
 * Checks if the HTTP status code indicates unauthorized access.
 * @param status - The HTTP status code.
 * @returns True if the status code is 401, otherwise false.
 */
export function isHttpUnauthorized(status: number): boolean {
	return status === 401;
}

/**
 * Checks if the HTTP status code indicates payment required.
 * @param status - The HTTP status code.
 * @returns True if the status code is 402, otherwise false.
 */
export function isHttpPaymentRequired(status: number): boolean {
	return status === 402;
}

/**
 * Checks if the HTTP status code indicates forbidden access.
 * @param status - The HTTP status code.
 * @returns True if the status code is 403, otherwise false.
 */
export function isHttpForbidden(status: number): boolean {
	return status === 403;
}

/**
 * Checks if the HTTP status code indicates method not allowed.
 * @param status - The HTTP status code.
 * @returns True if the status code is 405, otherwise false.
 */
export function isHttpMethodNotAllowed(status: number): boolean {
	return status === 405;
}

/**
 * Checks if the HTTP status code indicates not acceptable.
 * @param status - The HTTP status code.
 * @returns True if the status code is 406, otherwise false.
 */
export function isHttpNotAcceptable(status: number): boolean {
	return status === 406;
}

/**
 * Checks if the HTTP status code indicates a conflict.
 * @param status - The HTTP status code.
 * @returns True if the status code is 409, otherwise false.
 */
export function isHttpConflict(status: number): boolean {
	return status === 409;
}

/**
 * Checks if the HTTP status code indicates gone.
 * @param status - The HTTP status code.
 * @returns True if the status code is 410, otherwise false.
 */
export function isHttpGone(status: number): boolean {
	return status === 410;
}

/**
 * Checks if the HTTP status code indicates length required.
 * @param status - The HTTP status code.
 * @returns True if the status code is 411, otherwise false.
 */
export function isHttpLengthRequired(status: number): boolean {
	return status === 411;
}

/**
 * Checks if the HTTP status code indicates precondition failed.
 * @param status - The HTTP status code.
 * @returns True if the status code is 412, otherwise false.
 */
export function isHttpPreconditionFailed(status: number): boolean {
	return status === 412;
}

/**
 * Checks if the HTTP status code indicates request entity too large.
 * @param status - The HTTP status code.
 * @returns True if the status code is 413, otherwise false.
 */
export function isHttpRequestEntityTooLarge(status: number): boolean {
	return status === 413;
}

/**
 * Checks if the HTTP status code indicates unsupported media type.
 * @param status - The HTTP status code.
 * @returns True if the status code is 415, otherwise false.
 */
export function isHttpUnsupportedMediaType(status: number): boolean {
	return status === 415;
}

/**
 * Checks if the HTTP status code indicates requested range not satisfiable.
 * @param status - The HTTP status code.
 * @returns True if the status code is 416, otherwise false.
 */
export function isHttpRequestedRangeNotSatisfiable(status: number): boolean {
	return status === 416;
}

/**
 * Checks if the HTTP status code indicates unprocessable entity.
 * @param status - The HTTP status code.
 * @returns True if the status code is 422, otherwise false.
 */
export function isHttpUnprocessableEntity(status: number): boolean {
	return status === 422;
}

/**
 * Checks if the HTTP status code indicates insufficient storage.
 * @param status - The HTTP status code.
 * @returns True if the status code is 507, otherwise false.
 */
export function isHttpInsufficientStorage(status: number): boolean {
	return status === 507;
}

/**
 * Checks if the HTTP status code indicates bandwidth limit exceeded.
 * @param status - The HTTP status code.
 * @returns True if the status code is 509, otherwise false.
 */
export function isHttpBandwidthLimitExceeded(status: number): boolean {
	return status === 509;
}

/**
 * Checks if the HTTP status code indicates internal server error.
 * @param status - The HTTP status code.
 * @returns True if the status code is 500, otherwise false.
 */
export function isHttpInternalServerError(status: number): boolean {
	return status === 500;
}

/**
 * Checks if the HTTP status code indicates not implemented.
 * @param status - The HTTP status code.
 * @returns True if the status code is 501, otherwise false.
 */
export function isHttpNotImplemented(status: number): boolean {
	return status === 501;
}

/**
 * Checks if the HTTP status code indicates a request timeout.
 * @param status - The HTTP status code.
 * @returns True if the status code is 408, otherwise false.
 */
export function isHttpRequestTimeout(status: number): boolean {
	return status === 408;
}

/**
 * Checks if the HTTP status code indicates a bad gateway.
 * @param status - The HTTP status code.
 * @returns True if the status code is 502, otherwise false.
 */
export function isHttpBadGateway(status: number): boolean {
	return status === 502;
}

/**
 * Checks if the HTTP status code is considered retryable.
 * Retryable status codes typically indicate a temporary condition.
 * @param status - The HTTP status code.
 * @returns True if the status code is retryable, otherwise false.
 */
export function isRetryable(status: number): boolean {
	return (
		isHttpNotFound(status) ||
		isHttpConflict(status) ||
		isHttpLocked(status) ||
		isHttpTooManyRequests(status) ||
		isHttpInternalServerError(status) ||
		isHttpServiceUnavailable(status) ||
		isHttpGatewayTimeout(status) ||
		isHttpInsufficientStorage(status) ||
		isHttpBandwidthLimitExceeded(status) ||
		isHttpRequestTimeout(status) ||
		isHttpBadGateway(status) ||
		status < 1
	);
}
